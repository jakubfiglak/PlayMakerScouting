const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');
const pluralizeAssetType = require('../utils/pluralizeAssetType');
const isPlaymakerScout = require('../utils/isPlaymakerScout');

function canView(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      return next();
    }

    const assetTypePlural = pluralizeAssetType(assetType);

    const playmakerScoutAccessCondtions =
      req[assetType].isSeededFromPlaymakerDb === true ||
      req[assetType].createdByUserWithRole === 'admin' ||
      req[assetType].createdByUserWithRole === 'playmaker-scout';

    const isInAcl = req.acl[assetTypePlural].includes(req.params.id);
    const isPublic = req[assetType].isPublic === true;
    const hasExtraPlaymakerScoutAccess = isPlaymakerScout(req.user.role)
      ? playmakerScoutAccessCondtions
      : false;

    const hasAccess = isInAcl || isPublic || hasExtraPlaymakerScoutAccess;

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
