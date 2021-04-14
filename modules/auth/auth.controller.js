const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const authService = require('./auth.service');
const dbService = require('../../services/db.service');
const options = require('./options');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser({
    reqBody: req.body,
    host: req.headers.host,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new user!',
    data: user,
  });
});

// @desc Verify user
// @route GET /api/v1/auth/confirm/:confirmationCode
// @access Public
exports.verifyUser = asyncHandler(async (req, res) => {
  const user = await authService.verifyUser(req.userData);

  res.status(httpStatus.OK).json({
    success: true,
    data: user,
    message: 'Account activated successfully, you can now log in to the app!',
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res) => {
  const { user, token, expiresAt } = await authService.login(req.userData);

  res.status(httpStatus.OK).cookie('token', token, options.cookies).json({
    success: true,
    message: 'Login success!',
    data: {
      user,
      expiresAt,
    },
  });
});

// @desc View account details
// @route GET /api/v1/auth/account
// @access Private
exports.account = asyncHandler(async (req, res) => {
  const user = await dbService.getUserById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update account details
// @route PUT /api/v1/auth/updatedetails
// @access Private
exports.updateDetails = asyncHandler(async (req, res) => {
  const user = await authService.updateDetails({
    user: req.userData,
    reqBody: req.body,
  });

  res.status(200).json({
    success: true,
    message: 'Account details successfully updated!',
    data: user,
  });
});

// @desc Update password
// @route PUT /api/v1/auth/updatepassword
// @access Private
exports.updatePassword = asyncHandler(async (req, res) => {
  const { token, expiresAt } = await authService.updatePassword({
    user: req.userData,
    newPassword: req.body.newPassword,
  });

  res.status(200).cookie('token', token, options.cookies).json({
    success: true,
    message: 'Password updated successfully!',
    expiresAt,
  });
});
