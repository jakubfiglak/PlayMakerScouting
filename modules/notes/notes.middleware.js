const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/ApiError');
const Note = require('./note.model');
const setAsset = require('../../middleware/setAsset');
const playersService = require('../players/players.service');

const setNote = setAsset({ name: 'note', model: Note });

const setPlayerData = asyncHandler(async (req, res, next) => {
  const playerId = req.body.player;

  if (!playerId) {
    return next();
  }

  const player = await playersService.getPlayerById(playerId);

  if (!player) {
    return next(new ApiError(`Player not found with the id of ${playerId}`, httpStatus.NOT_FOUND));
  }
  req.playerData = player;
  next();
});

function setCurrentClub(req, res, next) {
  if (req.playerData) {
    req.body.playerCurrentClub = req.playerData.club;
  }
  next();
}

function filterNullishValues(req, res, next) {
  if (!req.body.player) {
    req.body.player = undefined;
  }
  if (!req.body.match) {
    req.body.match = undefined;
  }
  next();
}

module.exports = { setNote, setPlayerData, setCurrentClub, filterNullishValues };
