const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/ApiError');
const ordersService = require('../orders/orders.service');
const playersService = require('../players/players.service');
const getIndividualSkillsProps = require('../../utils/getIndividualSkillsProps');
const isAdmin = require('../../utils/isAdmin');
const setAsset = require('../../middleware/setAsset');
const Report = require('./report.model');
const options = require('./options');

function setAuthor(req, res, next) {
  req.body.scout = req.user._id;
  next();
}

const setOrderData = asyncHandler(async (req, res, next) => {
  const orderId = req.body.order;
  if (req.body.order) {
    const order = await ordersService.getOrderById(orderId);
    if (!order) {
      return next(new ApiError(`Order not found with the id of ${orderId}`, httpStatus.NOT_FOUND));
    }
    req.orderData = order;
  } else {
    req.body.order = undefined;
  }
  next();
});

function checkOrderStatus(req, res, next) {
  if (req.orderData) {
    const { status, scout } = req.orderData;
    if (status !== 'accepted') {
      return next(
        new ApiError(
          `You cannot create a report linked to the order with the status of ${status}`,
          httpStatus.BAD_REQUEST
        )
      );
    }
    if (scout.toHexString() !== req.user._id) {
      return next(
        new ApiError(
          "You cannot create a report linked to the order you haven't accepted",
          httpStatus.BAD_REQUEST
        )
      );
    }
  }
  next();
}

const setPlayerData = asyncHandler(async (req, res, next) => {
  req.body.player = req.body.player || req.orderData.player._id;
  const playerId = req.body.player;
  const player = await playersService.getPlayerById(playerId);
  if (!player) {
    return next(new ApiError(`Player not found with the id of ${playerId}`, httpStatus.NOT_FOUND));
  }
  req.playerData = player;
  next();
});

function setCurrentClub(req, res, next) {
  req.body.playerCurrentClub = req.playerData.club;
  next();
}

function setIndividualSkills(req, res, next) {
  req.body.individualSkills = getIndividualSkillsProps(
    req.body.individualSkills,
    req.playerData.position
  );
  next();
}

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { scout: req.user._id };
  next();
}

const setReport = setAsset({ name: 'report', model: Report, populate: options.populate });

function checkAccessPermission(req, res, next) {
  const isPermitted = isAdmin(req.user.role) || req.report.scout._id.toHexString() === req.user._id;
  if (!isPermitted) {
    return next(
      new ApiError("You don't have access to the report you've requsted", httpStatus.FORBIDDEN)
    );
  }
  next();
}

module.exports = {
  setAuthor,
  setOrderData,
  checkOrderStatus,
  setPlayerData,
  setIndividualSkills,
  setAccessFilters,
  setReport,
  checkAccessPermission,
  setCurrentClub,
};
