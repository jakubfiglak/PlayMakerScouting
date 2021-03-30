const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const clubsService = require('../services/clubs.service');
const isAdmin = require('../utils/isAdmin');

// @desc Create new club
// @route POST /api/v1/clubs
// @access Private (admin only)
exports.createClub = asyncHandler(async (req, res) => {
  const club = await clubsService.createClub({
    clubData: req.body,
    userId: req.user._id,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new club!',
    data: club,
  });
});

// @desc Get all clubs
// @route GET /api/v1/clubs
// @access Private
exports.getClubs = asyncHandler(async (req, res) => {
  let clubs;

  if (isAdmin(req.user.role)) {
    clubs = await clubsService.getAllClubs(req.query);
  } else {
    clubs = await clubsService.getClubsWithAuthorization({
      reqQuery: req.query,
      userId: req.user._id,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    data: clubs,
  });
});

// @desc Get clubs list
// @route GET /api/v1/clubs/list
// @access Private
exports.getClubsList = asyncHandler(async (req, res) => {
  let clubs;

  if (isAdmin(req.user.role)) {
    clubs = await clubsService.getAllClubsList();
  } else {
    clubs = await clubsService.getClubsListWithAuthorization(req.user._id);
  }

  return res.status(httpStatus.OK).json({
    success: true,
    count: clubs.length,
    data: clubs,
  });
});

// @desc Get single club
// @route GET /api/v1/clubs/:id
// @access Private
exports.getClub = asyncHandler(async (req, res) => {
  const club = await clubsService.getClub({
    clubId: req.params.id,
    userId: req.user._id,
    userRole: req.user.role,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: club,
  });
});

// @desc Update club details
// @route PUT /api/v1/clubs/:id
// @access Private
exports.updateClub = asyncHandler(async (req, res) => {
  const club = await clubsService.updateClub({
    clubId: req.params.id,
    clubData: req.body,
    userId: req.user._id,
    userRole: req.user.role,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Club with the id of ${req.params.id} successfully updated!`,
    data: club,
  });
});

// @desc Delete club
// @route DELETE /api/v1/clubs/:id
// @access Private (admin only)
exports.deleteClub = asyncHandler(async (req, res) => {
  const clubId = req.params.id;

  await clubsService.deleteClub({ clubId, userId: req.user._id, userRole: req.user.role });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Club with the id of ${clubId} successfully removed!`,
    data: clubId,
  });
});

// @desc Grant user with an access to a specific club
// @route POST /api/v1/clubs/grantaccess
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res) => {
  const userId = req.body.user;
  const clubId = req.body.club;

  await clubsService.grantAccess({ clubId, userId });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the club with the id of ${clubId}`,
  });
});
