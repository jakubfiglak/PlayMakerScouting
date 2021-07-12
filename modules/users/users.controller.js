const asyncHandler = require('express-async-handler');
const usersService = require('./users.service');

// @desc Get all users
// @route GET /api/v1/users
// @access Private (admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const { query, paginationOptions } = req;
  const users = await usersService.getAllUsers({ query, paginationOptions });

  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc Get users list
// @route GET /api/v1/users/list
// @access Private (admin only)
exports.getUsersList = asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsersList();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private (admin only)
exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.userData,
  });
});

// @desc Change user role
// @route POST /api/v1/users/:id/change-role
// @access Private (admin only)
exports.changeRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.changeRole({ user: req.userData, role: req.body.role });

  res.status(200).json({
    success: true,
    data: user,
    message: `Successfully changed user with the id of ${id} role to ${req.body.role}`,
  });
});
