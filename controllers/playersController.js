const asyncHandler = require('express-async-handler');
const Player = require('../models/Player');
const Club = require('../models/Club');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc Create new player
// @route POST /api/v1/players
// @access Private
// TODO: add player to myPlayers when the player is created
exports.createPlayer = asyncHandler(async (req, res, next) => {
  const clubId = req.body.club;

  const club = await Club.findById(clubId);

  if (!club) {
    return next(
      new ErrorResponse(`No club found with the id of ${clubId}`, 404)
    );
  }

  const player = await Player.create(req.body);

  // If the user creating the player is not an admin, push the players ID to users myPlayers array
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    user.myClubs.push(player._id);
    await user.save();
  }

  res.status(201).json({
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

  res.status(200).json(res.advancedResults);
});

// @desc Get players list
// @route GET /api/v1/players/list
// @access Private
exports.getPlayersList = asyncHandler(async (req, res) => {
  const players = await Player.find()
    .select('firstName lastName')
    .populate({ path: 'club', select: 'name' });

  return res.status(200).json({
    success: true,
    count: players.length,
    data: players,
  });
});

// @desc Get single player
// @route GET /api/v1/players/:id
// @access Private
exports.getPlayer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const player = await Player.findById(id)
    .populate({
      path: 'club',
      select: 'name division',
    })
    .populate('reports');

  if (!player) {
    return next(new ErrorResponse(`No player found with the id of ${id}`, 404));
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
  const { id } = req.params;

  const player = await Player.findById(id);

  if (!player) {
    return next(new ErrorResponse(`No player found with the id of ${id}`, 404));
  }

  await player.remove();

  res.status(200).json({
    success: true,
    message: `Player with the id of ${id} successfully removed!`,
  });
});

// @desc Get my players (players that the user has access to - his ID is in privilegedUsers array)
// @route GET /api/v1/players/my
// @access Private
// TODO: refactor this route
exports.getMyPlayers = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
    );
  }

  const players = await Player.find(
    { privilegedUsers: _id },
    { privilegedUsers: 0 }
  );

  res.status(200).json({
    success: true,
    data: players,
  });
});
