const isAdmin = require('../utils/isAdmin');
const isPlaymakerScout = require('../utils/isPlaymakerScout');
const pluralizeAssetType = require('../utils/pluralizeAssetType');

function setAccessFilters(assetType) {
  const assetTypePlural = pluralizeAssetType(assetType);

  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      req.accessFilters = {};
      return next();
    }
    req.accessFilters = { $or: [{ _id: { $in: req.acl[assetTypePlural] } }, { isPublic: true }] };

    if (isPlaymakerScout(req.user.role)) {
      req.accessFilters.$or.push(
        { isSeededFromPlaymakerDb: true },
        { createdByUserWithRole: { $in: ['admin', 'playmaker-scout'] } }
      );
    }

    next();
  };
}

module.exports = setAccessFilters;
