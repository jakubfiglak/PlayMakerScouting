const isAdmin = require('./isAdmin');
const isPlaymakerScout = require('./isPlaymakerScout');
const pluralizeAssetType = require('./pluralizeAssetType');

function getAccessFilters({ assetType, userRole, acl }) {
  if (isAdmin(userRole)) {
    return {};
  }

  const assetTypePlural = pluralizeAssetType(assetType);

  const accessFilters = { $or: [{ _id: { $in: acl[assetTypePlural] } }, { isPublic: true }] };

  if (isPlaymakerScout(userRole)) {
    accessFilters.$or.push(
      { isSeededFromPlaymakerDb: true },
      { createdByUserWithRole: { $in: ['admin', 'playmaker-scout'] } }
    );
  }

  return accessFilters;
}

module.exports = getAccessFilters;
