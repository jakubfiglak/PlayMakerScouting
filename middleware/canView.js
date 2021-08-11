const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');

function canView(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      return next();
    }

    const assetTypePlural = assetType === 'match' ? `${assetType}es` : `${assetType}s`;

    const hasAccess = req.acl[assetTypePlural].includes(req.params.id);

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

module.exports = canView;
