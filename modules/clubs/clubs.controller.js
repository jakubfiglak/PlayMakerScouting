const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const clubsService = require('./clubs.service');

// @desc Create new club
// @route POST /api/v1/clubs
// @access Private
exports.createClub = asyncHandler(async (req, res) => {
  const club = await clubsService.createClub(req.body);

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
  const { query, paginationOptions, accessFilters } = req;
  const clubs = await clubsService.getAllClubs({ query, paginationOptions, accessFilters });

  res.status(httpStatus.OK).json({
    success: true,
    data: clubs,
  });
});

// @desc Get clubs list
// @route GET /api/v1/clubs/list
// @access Private
exports.getClubsList = asyncHandler(async (req, res) => {
  const clubs = await clubsService.getAllClubsList(req.accessFilters);

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
  res.status(httpStatus.OK).json({
    success: true,
    data: req.club,
  });
});

// @desc Update club details
// @route PUT /api/v1/clubs/:id
// @access Private
exports.updateClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const club = await clubsService.updateClub({
    club: req.club,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Club with the id of ${id} successfully updated!`,
    data: club,
  });
});

// @desc Delete club
// @route DELETE /api/v1/clubs/:id
// @access Private
exports.deleteClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await clubsService.deleteClub(req.club);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Club with the id of ${id} successfully removed!`,
    data: id,
  });
});

// @desc Grant user with an access to a specific club
// @route POST /api/v1/clubs/:id/grantaccess
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res) => {
  const userId = req.body.user;
  const clubId = req.params.id;

  await clubsService.grantAccess({ club: req.club, userId });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the club with the id of ${clubId}`,
  });
});
