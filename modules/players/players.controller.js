const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const playersService = require('./players.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');

// @desc Create new player
// @route POST /api/v1/players
// @access Private
exports.createPlayer = asyncHandler(async (req, res) => {
  const player = await playersService.createPlayer(req.body);

  await accessControlListsService.grantAccessOnAssetCreation({
    userRole: req.user.role,
    userAcl: req.userAcl,
    teamAcl: req.teamAcl,
    assetType: 'player',
    assetId: player._id,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new player!',
    data: player,
  });
});

// @desc Get all players
// @route GET /api/v1/players
// @route GET /api/v1/clubs/:clubId/players
// @access Private (admin only)
exports.getPlayers = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  if (clubId) {
    req.query.club = clubId;
  }
  const { query, paginationOptions, accessFilters } = req;

  const players = await playersService.getAllPlayers({ query, paginationOptions, accessFilters });

  res.status(httpStatus.OK).json({
    success: true,
    data: players,
  });
});

// @desc Get players list
// @route GET /api/v1/players/list
// @access Private
exports.getPlayersList = asyncHandler(async (req, res) => {
  const players = await playersService.getAllPlayersList(req.accessFilters);

  res.status(httpStatus.OK).json({
    success: true,
    count: players.length,
    data: players,
  });
});

// @desc Get single player
// @route GET /api/v1/players/:id
// @access Private
exports.getPlayer = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.player,
  });
});

// @desc Update player details
// @route PUT /api/v1/players/:id
// @access Private
exports.updatePlayer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const player = await playersService.updatePlayer({
    player: req.player,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: player,
    message: `Player with the id of ${id} successfully updated!`,
  });
});

// @desc Delete player
// @route DELETE /api/v1/players/:id
// @access Private
exports.deletePlayer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await playersService.deletePlayer(req.player);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Player with the id of ${id} successfully removed!`,
    data: id,
  });
});
