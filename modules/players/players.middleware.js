const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Player = require('./player.model');
const options = require('./options');
const setAsset = require('../../middleware/setAsset');
const dbService = require('../../services/db.service');
const ApiError = require('../../utils/ApiError');

const setPlayer = setAsset({ name: 'player', model: Player, populate: options.populate });

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const ordersOperations = dbService.getOrdersForPlayer(id);
  const reportsOperations = dbService.getReportsForPlayer(id);

  const results = await Promise.all([ordersOperations, reportsOperations]);

  if (results[0].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a player with existing relations to order documents',
        httpStatus.FORBIDDEN
      )
    );
  }

  if (results[1].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a player with existing relations to report documents',
        httpStatus.FORBIDDEN
      )
    );
  }
  next();
});

function canAccessBeGranted(req, res, next) {
  const userId = req.body.user;
  const { id } = req.params;

  if (req.player.authorizedUsers.includes(userId)) {
    return next(
      new ApiError(
        `User with the id of ${userId} already has access to the player with the id of ${id}`,
        httpStatus.BAD_REQUEST
      )
    );
  }

  next();
}

module.exports = { setPlayer, canBeDeleted, canAccessBeGranted };
