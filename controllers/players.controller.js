const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const playersService = require('../services/players.service');
const isAdmin = require('../utils/isAdmin');

// @desc Create new player
// @route POST /api/v1/players
// @access Private
exports.createPlayer = asyncHandler(async (req, res) => {
  const player = await playersService.createPlayer({ playerData: req.body, userId: req.user._id });

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

  let players;

  if (isAdmin(req.user.role)) {
    players = await playersService.getAllPlayers(req.query);
  } else {
    players = await playersService.getPlayersWithAuthorization({
      reqQuery: req.query,
      userId: req.user._id,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    data: players,
  });
});

// @desc Get players list
// @route GET /api/v1/players/list
// @access Private
exports.getPlayersList = asyncHandler(async (req, res) => {
  let players;

  if (isAdmin(req.user.role)) {
    players = await playersService.getAllPlayersList();
  } else {
    players = await playersService.getPlayersListWithAuthorization(req.user._id);
  }

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
  const player = await playersService.getPlayer({
    playerId: req.params.id,
    userId: req.user._id,
    userRole: req.user.role,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: player,
  });
});

// @desc Update player details
// @route PUT /api/v1/players/:id
// @access Private
exports.updatePlayer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const player = await playersService.updatePlayer({
    playerId: id,
    playerData: req.body,
    userId: req.user._id,
    userRole: req.user.role,
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

  await playersService.deletePlayer({
    playerId: id,
    userId: req.user._id,
    userRole: req.user.role,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Player with the id of ${id} successfully removed!`,
    data: id,
  });
});

// @desc Grant user with an access to a specific player
// @route POST /api/v1/players/grantaccess
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res) => {
  const userId = req.body.user;
  const playerId = req.body.player;

  await playersService.grantAccess({ playerId, userId });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the player with the id of ${playerId}`,
  });
});
