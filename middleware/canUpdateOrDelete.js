const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');

function canUpdateOrDelete(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      return next();
    }

    const isPermitted = req[assetType].author.toHexString() === req.user._id;

    if (!isPermitted) {
      return next(
        new ApiError('You are not permitted to perform this operation', httpStatus.FORBIDDEN)
      );
    }
    next();
  };
}

module.exports = canUpdateOrDelete;
