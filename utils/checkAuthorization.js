const httpStatus = require('http-status');
const ApiError = require('./ApiError');

function checkOrderAuthorization({ userRole, userId, order }) {
  const isAuthorized = userRole === 'admin' || order.scout === userId || order.status === 'open';

  if (!isAuthorized) {
    throw new ApiError(
      "You don't have access to the asset you've requested",
      httpStatus.UNAUTHORIZED
    );
  }
}

function checkAuthorization({ userRole, userId, asset }) {
  const isAuthorized = userRole === 'admin' || asset.authorizedUsers.includes(userId);

  if (!isAuthorized) {
    throw new ApiError(
      "You don't have access to the asset you've requested",
      httpStatus.UNAUTHORIZED
    );
  }
}

module.exports = { checkAuthorization, checkOrderAuthorization };
