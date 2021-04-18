const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');

function checkAccessPermission(assetName) {
  return function (req, res, next) {
    const { _id, role } = req.user;

    const isAssignedToTheAsset = req[assetName].authorizedUsers.includes(_id);
    const isPermitted = isAdmin(role) || isAssignedToTheAsset;

    if (!isPermitted) {
      return next(
        new ApiError(
          `You don't have access to the ${assetName} you've requsted`,
          httpStatus.FORBIDDEN
        )
      );
    }
    next();
  };
}

module.exports = checkAccessPermission;
