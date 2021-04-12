const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

function checkOrderStatus(allowedStatuses) {
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

module.exports = checkOrderStatus;
