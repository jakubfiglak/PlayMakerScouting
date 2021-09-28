const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Club = require('./club.model');
const setAsset = require('../../middleware/setAsset');
const playersService = require('../players/players.service');
const matchesService = require('../matches/matches.service');
const notesService = require('../notes/notes.service');
const reportsService = require('../reports/reports.service');
const ApiError = require('../../utils/ApiError');

const setClub = setAsset({ name: 'club', model: Club });

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const playersOperations = playersService.getPlayersForClub(id);
  const matchesOperations = matchesService.getMatchesForClub(id);
  const notesOperations = notesService.getNotesForClub(id);
  const reportsOperations = reportsService.getReportsForClub(id);

  const results = await Promise.all([
    playersOperations,
    matchesOperations,
    notesOperations,
    reportsOperations,
  ]);

  if (results[0].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a club with existing relations to player documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  if (results[1].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a club with existing relations to match documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  if (results[2].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a club with existing relations to note documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  if (results[3].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a club with existing relations to report documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  next();
});

module.exports = { setClub, canBeDeleted };
