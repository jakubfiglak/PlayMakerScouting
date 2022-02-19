const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const crypto = require('crypto');
const authService = require('./auth.service');
const options = require('./options');
const usersService = require('../users/users.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');
const emailService = require('../email/email.service');
const ApiError = require('../../utils/ApiError');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res) => {
  const user = await usersService.createUser(req.body);
  await accessControlListsService.createAccessControlList({
    user: user._id,
  });

  const confirmationURL = `http://${req.headers.host}/confirm/${req.body.confirmationCode}`;

  await emailService.sendConfirmationEmail({
    email: user.email,
    username: user.firstName,
    confirmationURL,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Account created successfully! Please check your email to verify your account.',
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

// @desc Forgot password
// @route POST /api/v1/auth/forgotpassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await usersService.getUserByEmail(req.body.email);

  if (!user) {
    return next(new ApiError('User does not exist!', httpStatus.NOT_FOUND));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `http://${req.headers.host}/forgotpassword/${resetToken}`;

  await emailService.sendResetPasswordEmail({
    email: user.email,
    username: user.firstName,
    resetURL,
  });

  res.status(200).json({
    success: true,
    message: 'Reset password email sent!',
    data: user,
  });
});

// @desc Reset password
// @route PATCH /api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  console.log(resetPasswordToken);

  const user = await usersService.getUserByResetPasswordToken(resetPasswordToken);

  console.log(user);

  if (!user) {
    return next(new ApiError('Invalid token!', httpStatus.BAD_REQUEST));
  }

  const { token, expiresAt } = await authService.updatePassword({
    user,
    newPassword: req.body.password,
  });

  res.status(200).cookie('token', token, options.cookies).json({
    success: true,
    message: 'Password updated successfully!',
    expiresAt,
  });
});
