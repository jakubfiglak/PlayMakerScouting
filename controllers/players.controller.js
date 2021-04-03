const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Player = require('../models/player.model');
const Club = require('../models/club.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const prepareQuery = require('../utils/prepareQuery');
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
// @access Private (admin only)
exports.deletePlayer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const player = await Player.findById(id);

  if (!player) {
    return next(new ApiError(`No player found with the id of ${id}`, 404));
  }

  await player.remove();

  res.status(200).json({
    success: true,
    message: `Player with the id of ${id} successfully removed!`,
  });
});

// @desc Grant user with an access to a specific player
// @route POST /api/v1/players/grantaccess
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res, next) => {
  const userId = req.body.user;
  const playerId = req.body.player;

  const user = await User.findById(userId);
  const player = await Player.findById(playerId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (!player) {
    return next(new ApiError(`Player not found with the id of ${playerId}`, 404));
  }

  if (user.myPlayers.includes(playerId)) {
    return next(
      new ApiError(
        `User with the id of ${userId} already has access to the player with the id of ${playerId}`
      )
    );
  }

  // If user doesn't have players club in myClubs array, add it
  if (!user.myClubs.includes(player.club)) {
    user.myClubs.push(player.club);
  }

  user.myPlayers.push(playerId);
  await user.save();

  res.status(200).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the player with the id of ${playerId}`,
  });
});
