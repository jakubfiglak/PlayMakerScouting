const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Get all users
// @route POST /api/v1/users
// @access Private (admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    data: users,
  });
});

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private (admin only)
exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private (admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(201).json({
    success: true,
    message: `User with the id of ${id} successfully removed!`,
  });
});
