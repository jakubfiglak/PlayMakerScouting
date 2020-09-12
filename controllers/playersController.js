const asyncHandler = require('express-async-handler');
const Player = require('../models/Player');
const Club = require('../models/Club');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const clearQuery = require('../utils/clearQuery');

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

  // If the user creating the player is not an admin, push the players ID to users myPlayers array
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    user.myPlayers.push(player._id);
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
// @route DELETE /api/v1/players/:id
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

// @desc Get my players (players that the user has access to)
// @route GET /api/v1/players/my
// @access Private
exports.getMyPlayers = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
    );
  }

  const { myPlayers } = user;

  const reqQuery = clearQuery(req.query);

  const query = {
    _id: { $in: myPlayers },
    ...reqQuery,
  };

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
  };

  const players = await Player.paginate(query, options);

  res.status(200).json({
    success: true,
    data: players,
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
    return next(
      new ErrorResponse(`User not found with the id of ${userId}`, 404)
    );
  }

  if (!player) {
    return next(
      new ErrorResponse(`Player not found with the id of ${playerId}`, 404)
    );
  }

  if (user.myPlayers.includes(playerId)) {
    return next(
      new ErrorResponse(
        `User with the id of ${userId} already has access to the player with the id of ${playerId}`
      )
    );
  }

  user.myPlayers.push(playerId);
  await user.save();

  res.status(200).json({
    success: true,
    message: `Successfully granted the user with the id of ${userId} with the access to the player with the id of ${playerId}`,
  });
});
