const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');

function checkAccessPermission(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      return next();
    }

    const hasAccess = req.acl[`${assetType}s`].includes(req.params.id);

    if (!hasAccess) {
      return next(
        new ApiError(
          `You don't have access to the ${assetType} you've requsted`,
          httpStatus.FORBIDDEN
        )
      );
    }
    next();
  };
}

module.exports = checkAccessPermission;
