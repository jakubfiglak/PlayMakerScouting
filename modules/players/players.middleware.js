const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Player = require('./player.model');
const options = require('./options');
const setAsset = require('../../middleware/setAsset');
const ordersService = require('../orders/orders.service');
const reportsService = require('../reports/reports.service');
const notesService = require('../notes/notes.service');
const ApiError = require('../../utils/ApiError');

const setPlayer = setAsset({ name: 'player', model: Player, populate: options.populate });

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const ordersOperations = ordersService.getOrdersForPlayer(id);
  const reportsOperations = reportsService.getReportsForPlayer(id);
  const notesOperations = notesService.getNotesForPlayer(id);

  const results = await Promise.all([ordersOperations, reportsOperations, notesOperations]);

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

  if (results[2].length > 0) {
    return next(
      new ApiError(
        'You cannot delete a player with existing relations to note documents',
        httpStatus.FORBIDDEN
      )
    );
  }

  next();
});

module.exports = { setPlayer, canBeDeleted };
