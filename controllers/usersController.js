const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all users
// @route GET /api/v1/users
// @access Private (admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private (admin only)
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with the id of ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private (admin only)
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with the id of ${id}`, 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: `User with the id of ${id} successfully removed!`,
  });
});
