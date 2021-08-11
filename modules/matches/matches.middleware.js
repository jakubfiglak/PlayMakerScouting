const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Match = require('./match.model');
const setAsset = require('../../middleware/setAsset');
const notesService = require('../notes/notes.service');
const ApiError = require('../../utils/ApiError');

const setMatch = setAsset({ name: 'match', model: Match });

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const notes = await notesService.getNotesForMatch(id);

  if (notes.length > 0) {
    return next(
      new ApiError(
        'You cannot delete a match with existing relations to notes documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  next();
});

module.exports = { setMatch, canBeDeleted };
