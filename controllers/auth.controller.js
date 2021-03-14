const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const authService = require('../services/auth.service');
const usersService = require('../services/users.service');

const cookieOptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 30 * 1000 * 60 * 60 * 24),
};

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
  const { confirmationCode } = req.params;

  const user = await authService.verifyUser(confirmationCode);

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
  const { email, password } = req.body;

  const { user, token, expiresAt } = await authService.login({
    email,
    password,
  });

  res.status(httpStatus.OK).cookie('token', token, cookieOptions).json({
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
  const user = await usersService.getUserById(req.user._id);

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
    id: req.user._id,
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
    userId: req.user._id,
    reqBody: req.body,
  });

  res.status(200).cookie('token', token, cookieOptions).json({
    success: true,
    message: 'Password updated successfully!',
    expiresAt,
  });
});
