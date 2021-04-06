const httpStatus = require('http-status');
const ApiError = require('./ApiError');

function checkOrderStatus({ status, allowedStatuses }) {
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(
      `You cannot perform this operation on an order with the status of ${status}`,
      httpStatus.BAD_REQUEST
    );
  }
}

module.exports = checkOrderStatus;
