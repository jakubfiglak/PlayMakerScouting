const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Order = require('./order.model');
const options = require('./options');
const reportsService = require('../reports/reports.service');
const ApiError = require('../../utils/ApiError');
const isAdmin = require('../../utils/isAdmin');
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

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const reports = await reportsService.getReportsForClub(id);
  if (reports.length > 0) {
    return next(
      new ApiError(
        'You cannot delete an order with existing relations to report documents',
        httpStatus.FORBIDDEN
      )
    );
  }

  next();
});

module.exports = {
  canView,
  canReject,
  checkStatus,
  setAccessFilters,
  setOrder,
  canBeDeleted,
};
