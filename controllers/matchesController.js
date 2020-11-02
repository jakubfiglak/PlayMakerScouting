const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');
const Club = require('../models/Club');
const Player = require('../models/Player');
const ErrorResponse = require('../utils/errorResponse');
const prepareQuery = require('../utils/prepareQuery');

// @desc Create new match
// @route POST /api/v1/matches
// @access Private
exports.createMatch = asyncHandler(async (req, res, next) => {
  const homeTeamId = req.body.homeTeam;
  const awayTeamId = req.body.awayTeam;

  const homeTeam = await Club.findById(homeTeamId);
  const awayTeam = await Club.findById(awayTeamId);

  if (!homeTeam) {
    return next(
      new ErrorResponse(`No club found with the id of ${homeTeamId}`, 404)
    );
  }

  if (!awayTeam) {
    return next(
      new ErrorResponse(`No club found with the id of ${awayTeamId}`, 404)
    );
  }

  let match = await Match.create(req.body);

  match = await match
    .populate([
      { path: 'homeTeam', select: 'name' },
      { path: 'awayTeam', select: 'name' },
    ])
    .execPopulate();

  res.status(201).json({
    success: true,
    message: 'Successfully created new match!',
    data: match,
  });
});

// @desc Get all matches
// @route GET /api/v1/matches
// @route GET /api/v1/clubs/:clubId/matches
// @route GET /api/v1/players/:playerId/matches
// @access Private
exports.getMatches = asyncHandler(async (req, res) => {
  const { clubId } = req.params;
  const { playerId } = req.params;

  const populate = [
    {
      path: 'homeTeam',
      select: 'name',
    },
    { path: 'awayTeam', select: 'name' },
  ];

  if (playerId) {
    const player = await Player.findById(playerId);
    const { club } = player;

    const matches = await Match.find({
      $or: [{ homeTeam: club }, { awayTeam: club }],
    }).populate(populate);

    return res.status(200).json({
      success: true,
      data: matches,
    });
  }

  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
    populate,
  };

  if (clubId) {
    const query = {
      $or: [{ homeTeam: clubId }, { awayTeam: clubId }],
      ...reqQuery,
    };

    const matches = await Match.paginate(query, options);

    return res.status(200).json({
      success: true,
      data: matches,
    });
  }

  const matches = await Match.paginate(reqQuery, options);

  res.status(200).json({
    success: true,
    data: matches,
  });
});

// @desc Get single match
// @route GET /api/v1/matches/:id
// @access Private
exports.getMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id)
    .populate({
      path: 'homeTeam',
      select: 'name',
    })
    .populate({ path: 'awayTeam', select: 'name' });

  if (!match) {
    return next(
      new ErrorResponse(`No match found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: match,
  });
});

// @desc Update match details
// @route PUT /api/v1/matches/:id
// @access Private
exports.updateMatch = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let match = await Match.findById(id);

  if (!match) {
    return next(new ErrorResponse(`No match found with the id of ${id}`, 404));
  }

  match = await Match.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate([
      { path: 'homeTeam', select: 'name' },
      { path: 'awayTeam', select: 'name' },
    ])
    .execPopulate();

  res.status(200).json({
    success: true,
    message: `Match with the id of ${id} successfully updated!`,
    data: match,
  });
});

// @desc Delete match
// @route DELETE /api/v1/matches/:id
// @access Private (admin only)
exports.deleteMatch = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const match = await Match.findById(id);

  if (!match) {
    return next(new ErrorResponse(`No match found with the id of ${id}`, 404));
  }

  await match.remove();

  res.status(200).json({
    success: true,
    message: `Match with the id of ${id} successfully removed!`,
  });
});
