const asyncHandler = require('express-async-handler');
const Club = require('../models/Club');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const prepareQuery = require('../utils/prepareQuery');

// @desc Create new club
// @route POST /api/v1/clubs
// @access Private (admin only)
exports.createClub = asyncHandler(async (req, res, next) => {
  const club = await Club.create(req.body);

  // If the user creating the club is not an admin, push the clubs ID to users myClubs array
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ApiError(`User not found with id of ${req.user._id}`, 404)
      );
    }

    user.myClubs.push(club._id);
    await user.save();
  }

  res.status(201).json({
    success: true,
    message: 'Successfully created new club!',
    data: club,
  });
});

// @desc Get all clubs
// @route GET /api/v1/clubs
// @access Private
exports.getClubs = asyncHandler(async (req, res, next) => {
  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
  };

  const query = { ...reqQuery };

  // If user is not an admin return only clubs to which this user has access to
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ApiError(`User not found with the id of ${req.user._id}`, 404)
      );
    }

    const { myClubs } = user;

    query._id = { $in: myClubs };
  }

  const clubs = await Club.paginate(query, options);

  res.status(200).json({
    success: true,
    data: clubs,
  });
});

// @desc Get clubs list
// @route GET /api/v1/clubs/list
// @access Private
exports.getClubsList = asyncHandler(async (req, res, next) => {
  const query = {};

  // If user is not an admin return only clubs to which this user has access to
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ApiError(`User not found with the id of ${req.user._id}`, 404)
      );
    }

    const { myClubs } = user;

    query._id = { $in: myClubs };
  }

  const clubs = await Club.find(query).select('name').sort('name');

  return res.status(200).json({
    success: true,
    count: clubs.length,
    data: clubs,
  });
});

// @desc Get single club
// @route GET /api/v1/clubs/:id
// @access Private
exports.getClub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (!user.myClubs.includes(id)) {
    return next(
      new ApiError(
        `You don't have access to the club with the if of ${id}`,
        400
      )
    );
  }

  const club = await Club.findById(id);

  if (!club) {
    return next(new ApiError(`Club not found with id of ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: club,
  });
});

// @desc Update club details
// @route PUT /api/v1/clubs/:id
// @access Private
exports.updateClub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (!user.myClubs.includes(id) && user.role !== 'admin') {
    return next(
      new ApiError(
        `You don't have access to the club with the if of ${id}`,
        400
      )
    );
  }

  const club = await Club.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `Club with the id of ${id} successfully updated!`,
    data: club,
  });
});

// @desc Delete club
// @route DELETE /api/v1/clubs/:id
// @access Private (admin only)
exports.deleteClub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const club = await Club.findById(id);

  if (!club) {
    return next(new ApiError(`Club not found with id of ${id}`, 404));
  }

  await club.remove();

  res.status(200).json({
    success: true,
    message: `Club with the id of ${id} successfully removed!`,
    data: id,
  });
});

// @desc Grant user with an access to a specific club
// @route POST /api/v1/clubs/grantaccess
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res, next) => {
  const userId = req.body.user;
  const clubId = req.body.club;

  const user = await User.findById(userId);
  const club = await Club.findById(clubId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (!club) {
    return next(new ApiError(`Club not found with the id of ${clubId}`, 404));
  }

  if (user.myClubs.includes(clubId)) {
    return next(
      new ApiError(
        `User with the id of ${userId} already has access to the club with the id of ${clubId}`
      )
    );
  }

  user.myClubs.push(clubId);
  await user.save();

  res.status(200).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the club with the id of ${clubId}`,
  });
});
