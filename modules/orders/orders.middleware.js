const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Order = require('./order.model');
const options = require('./options');
const ApiError = require('../../utils/ApiError');
const isAdmin = require('../../utils/isAdmin');
const dbService = require('../../services/db.service');
const setAsset = require('../../middleware/setAsset');

function canView(req, res, next) {
  const { order, user } = req;
  const isPermitted = isAdmin(user.role) || order.scout === user._id || order.status === 'open';

  if (!isPermitted) {
    return next(
      new ApiError("You don't have access to the asset you've requsted", httpStatus.FORBIDDEN)
    );
  }
  next();
}

function canReject(req, res, next) {
  const { order, user } = req;
  const isPermitted = order.scout && order.scout._id.toHexString() === user._id;

  if (!isPermitted) {
    return next(
      new ApiError('You cannot reject an order you are not assigned to', httpStatus.FORBIDDEN)
    );
  }
  next();
}

function checkStatus(allowedStatuses) {
  return (req, res, next) => {
    const { status } = req.order;
    if (!allowedStatuses.includes(req.order.status)) {
      return next(
        new ApiError(
          `You cannot perform this operation on an order with the status of ${status}`,
          httpStatus.BAD_REQUEST
        )
      );
    }

    next();
  };
}

const grantAccessToAPlayer = asyncHandler(async (req, res, next) => {
  if (isAdmin(req.user.role)) {
    return next();
  }
  const player = await dbService.getPlayerById(req.order.player._id);

  if (player.authorizedUsers.includes(req.user._id)) {
    return next();
  }

  player.authorizedUsers.push(req.user._id);
  await player.save();
  next();
});

const grantAccessToAClub = asyncHandler(async (req, res, next) => {
  const clubId = req.order.player.club && req.order.player.club._id;

  if (isAdmin(req.user.role) || !clubId) {
    return next();
  }

  const club = await dbService.getClubById(clubId);

  if (club.authorizedUsers.includes(req.user._id)) {
    return next();
  }

  club.authorizedUsers.push(req.user._id);
  await club.save();
  next();
});

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { $or: [{ scout: req.user._id }, { status: 'open' }] };
  next();
}

const setOrder = setAsset({
  name: 'order',
  model: Order,
  populate: [options.populatePlayer, options.populateScout],
});

module.exports = {
  canView,
  canReject,
  checkStatus,
  grantAccessToAPlayer,
  grantAccessToAClub,
  setAccessFilters,
  setOrder,
};
