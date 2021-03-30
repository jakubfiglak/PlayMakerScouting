const asyncHandler = require('express-async-handler');
const Player = require('../models/player.model');
const Club = require('../models/club.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const prepareQuery = require('../utils/prepareQuery');
const playersService = require('../services/players.service');

// @desc Create new player
// @route POST /api/v1/players
// @access Private
exports.createPlayer = asyncHandler(async (req, res) => {
  const player = await playersService.createPlayer({ playerData: req.body, userId: req.user._id });

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
exports.getPlayers = asyncHandler(async (req, res, next) => {
  const { clubId } = req.params;

  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
    populate: [{ path: 'club', select: 'name division' }],
  };

  const query = { ...reqQuery };

  // If club ID is provided in query params, return only players assinged to this club
  if (clubId) {
    query.club = clubId;
  }

  // If user is not an admin return only players to which this user has access to
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(`User not found with id of ${req.user._id}`, 404));
    }

    const { myPlayers } = user;

    query._id = { $in: myPlayers };
  }

  const players = await Player.paginate(query, options);

  res.status(200).json({
    success: true,
    data: players,
  });
});

// @desc Get players list
// @route GET /api/v1/players/list
// @access Private
exports.getPlayersList = asyncHandler(async (req, res, next) => {
  const query = {};

  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(`User not found with id of ${req.user._id}`, 404));
    }

    const { myPlayers } = user;

    query._id = { $in: myPlayers };
  }

  const players = await Player.find(query)
    .select('firstName lastName position')
    .populate({ path: 'club', select: 'name' });

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
  const { id } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (user.role !== 'admin' && !user.myPlayers.includes(id)) {
    return next(new ApiError(`You don't have access to the player with the if of ${id}`, 400));
  }

  const player = await Player.findById(id)
    .populate({
      path: 'club',
      select: 'name division',
    })
    .populate('reports');

  if (!player) {
    return next(new ApiError(`No player found with the id of ${id}`, 404));
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
  const { id } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(`User not found with the id of ${userId}`, 404));
  }

  if (!user.myPlayers.includes(id) && user.role !== 'admin') {
    return next(new ApiError(`You don't have access to the player with the if of ${id}`, 400));
  }

  let player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  player = await player.populate({ path: 'club', select: 'name' }).execPopulate();

  res.status(200).json({
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
