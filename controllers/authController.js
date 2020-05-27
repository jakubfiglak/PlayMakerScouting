const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorResponse('User already exists', 400));
  }

  if (password !== passwordConfirm) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  user = await User.create({ name, email, password });

  const token = user.getJwt();

  res.status(201).json({
    success: true,
    message: 'Successfully created new user!',
    token,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and a password', 400)
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const match = await user.comparePasswords(password);

  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getJwt();

  res.status(200).json({
    success: true,
    message: 'Login success!',
    token,
  });
});

// @desc View account details
// @route GET /api/v1/auth/account
// @access Private
exports.account = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update account details
// @route PUT /api/v1/auth/updatedetails
// @access Private
exports.updateDetails = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `${req.user.name}'s account details successfully updated!`,
    data: user,
  });
});

// @desc Update password
// @route PUT /api/v1/auth/updatepassword
// @access Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const user = await User.findById(req.user.id);

  if (!user.comparePasswords(oldPassword)) {
    return next(new ErrorResponse('Incorrect password', 401));
  }

  if (newPassword !== newPasswordConfirm) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  user.password = newPassword;
  await user.save();

  const token = user.getJwt();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully!',
    token,
  });
});

// @desc forgot password
// @route POST /api/v1/auth/forgotpassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('No account with that email exists', 400));
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetURL = `http://${req.headers.host}${process.env.BASE_URL}/auth/resetpassword/${user.resetPasswordToken}`;

  const text = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      text,
    });

    res.status(200).json({
      success: true,
      message: 'Email sent',
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc reset password
// @route PUT /api/v1/auth/resetpassword/:resetToken
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, newPasswordConfirm } = req.body;
  const { resetToken } = req.params;

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorResponse('Password reset token is invalid or has expired.')
    );
  }

  if (newPassword !== newPasswordConfirm) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const token = user.getJwt();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully!',
    token,
  });
});
