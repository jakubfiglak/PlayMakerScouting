const asyncHandler = require('express-async-handler');
const Player = require('../models/Player');
const Club = require('../models/Club');
const ErrorResponse = require('../utils/errorResponse');

// @desc Create new player
// @route POST /api/v1/players
// @access Private
exports.createPlayer = asyncHandler(async (req, res, next) => {
  const clubId = req.body.club;

  const club = await Club.findById(clubId);

  if (!club) {
    return next(
      new ErrorResponse(`No club found with the id of ${clubId}`, 404)
    );
  }

  const player = await Player.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Successfully created new player!',
    data: player,
  });
});

// @desc Get all players
// @route GET /api/v1/players
// @route GET /api/v1/clubs/:clubId/players
// @access Private
exports.getPlayers = asyncHandler(async (req, res) => {
  if (req.params.clubId) {
    const players = await Player.find({
      club: req.params.clubId,
    });

    return res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  }

  const players = await Player.find().sort('name');
  res.status(200).json({
    success: true,
    count: players.length,
    data: players,
  });
});

// @desc Get single player
// @route GET /api/v1/players/:id
// @access Private
exports.getPlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate({
    path: 'club',
    select: 'name division',
  });

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: player,
  });
});

// @desc Update player details
// @route PUT /api/v1/players/:id
// @access Private
exports.updatePlayer = asyncHandler(async (req, res, next) => {
  let player = await Player.findById(req.params.id);

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${req.params.id}`, 404)
    );
  }

  player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: player,
  });
});

// @desc Delete player
// @route DELETE /api/v1/clubs/:id
// @access Private (admin only)
exports.deletePlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id);

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${req.params.id}`, 404)
    );
  }

  await player.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
