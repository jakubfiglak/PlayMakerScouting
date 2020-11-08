const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const prepareQuery = require('../utils/prepareQuery');

// @desc Get all users
// @route GET /api/v1/users
// @access Private (admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
  };

  const users = await User.paginate(reqQuery, options);

  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc Get users list
// @route GET /api/v1/users/list
// @access Private (admin only)
exports.getUsersList = asyncHandler(async (req, res) => {
  const users = await User.find().select('firstName lastName email role');

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

// @desc Make user a playmaker-scout
// @route POST /api/v1/users/assignplaymaker
// @access Private (admin only)
exports.assignPlaymakerRole = asyncHandler(async (req, res, next) => {
  const userId = req.body.user;

  const user = await User.findById(userId);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with the id of ${userId}`, 404)
    );
  }

  if (user.role === 'playmaker-scout') {
    return next(
      new ErrorResponse(
        `User with the id of ${userId} is already a playmaker-scout`
      )
    );
  }

  if (user.role === 'admin') {
    return next(new ErrorResponse(`User with the id of ${userId} is an admin`));
  }

  user.role = 'playmaker-scout';

  await user.save();

  res.status(200).json({
    success: true,
    message: `Successfully assigned the role of 'playmaker-scout' to the user with the id of ${userId}`,
  });
});
