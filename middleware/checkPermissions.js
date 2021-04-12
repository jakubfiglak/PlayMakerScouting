const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

function canViewOrder(req, res, next) {
  const { order, user } = req;
  const isPermitted = user.role === 'admin' || order.scout === user._id || order.status === 'open';

  if (!isPermitted) {
    return next(
      new ApiError("You don't have access to the asset you've requsted", httpStatus.FORBIDDEN)
    );
  }
  next();
}

function canRejectOrder(req, res, next) {
  const { order, user } = req;
  const isPermitted = order.scout && order.scout._id.toHexString() === user._id;

  if (!isPermitted) {
    return next(
      new ApiError('You cannot reject an order you are not assigned to', httpStatus.FORBIDDEN)
    );
  }
  next();
}

module.exports = { canViewOrder, canRejectOrder };
