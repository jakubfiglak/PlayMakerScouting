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

// @desc Go to the match
// @route PATCH /api/v1/users/go-to-the-match
// @access Private
exports.goToTheMatch = asyncHandler(async (req, res) => {
  const { match } = req.body;
  const user = await usersService.goToTheMatch({ user: req.userData, matchId: match });

  res.status(200).json({
    success: true,
    data: user,
    message: `You went to the match ${match}`,
  });
});

// @desc Leave the match
// @route PATCH /api/v1/users/leave-the-match
// @access Private
exports.leaveTheMatch = asyncHandler(async (req, res) => {
  const user = await usersService.leaveTheMatch(req.userData);

  res.status(200).json({
    success: true,
    data: user,
    message: 'You have left the match',
  });
});
