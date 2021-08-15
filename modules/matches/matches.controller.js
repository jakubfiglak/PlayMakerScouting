const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const matchesService = require('./matches.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');

// @desc Create new match
// @route POST /api/v1/matches
// @access Private
exports.createMatch = asyncHandler(async (req, res) => {
  const match = await matchesService.createMatch(req.body);

  await accessControlListsService.grantAccessOnAssetCreation({
    userRole: req.user.role,
    userAcl: req.userAcl,
    teamAcl: req.teamAcl,
    assetType: 'match',
    assetId: match._id,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new match',
    data: match,
  });
});

// @desc Get all matches
// @route GET /api/v1/matches
// @route GET /api/v1/clubs/:clubId/matches
// @access Private
exports.getMatches = asyncHandler(async (req, res) => {
  const { clubId } = req.params;

  if (clubId) {
    req.query.club = { $or: [{ homeTeam: clubId }, { awayTeam: clubId }] };
  }

  const { query, paginationOptions, accessFilters } = req;

  const matches = await matchesService.getAllMatches({ query, paginationOptions, accessFilters });

  res.status(httpStatus.OK).json({
    success: true,
    data: matches,
  });
});

// @desc Get matches list
// @route GET /api/v1/matches/list
// @access Private
exports.getMatchesList = asyncHandler(async (req, res) => {
  const matches = await matchesService.getAllMatchesList(req.accessFilters);

  res.status(httpStatus.OK).json({
    success: true,
    count: matches.length,
    data: matches,
  });
});

// @desc Get single match
// @route GET /api/v1/matches/:id
// @access Private
exports.getMatch = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.match,
  });
});

// @desc Update match details
// @route PUT /api/v1/matches/:id
// @access Private
exports.updateMatch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const match = await matchesService.updateMatch({
    match: req.match,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: match,
    message: `Match with the id of ${id} successfully updated!`,
  });
});

// @desc Delete match
// @route DELETE /api/v1/matches/:id
// @access Private
exports.deleteMatch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await matchesService.deleteMatch(req.match);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Match with the id of ${id} successfully removed!`,
    data: id,
  });
});
