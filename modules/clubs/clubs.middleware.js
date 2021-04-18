const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Club = require('./club.model');
const setAsset = require('../../middleware/setAsset');
const playersService = require('../players/players.service');
const ApiError = require('../../utils/ApiError');

const setClub = setAsset({ name: 'club', model: Club });

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const players = await playersService.getPlayersForClub(id);

  if (players.length > 0) {
    return next(
      new ApiError(
        'You cannot delete a club with existing relations to player documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  next();
});

function canAccessBeGranted(req, res, next) {
  const userId = req.body.user;
  const { id } = req.params;

  if (req.club.authorizedUsers.includes(userId)) {
    return next(
      new ApiError(
        `User with the id of ${userId} already has access to the club with the id of ${id}`,
        httpStatus.BAD_REQUEST
      )
    );
  }

  next();
}

module.exports = { setClub, canBeDeleted, canAccessBeGranted };
