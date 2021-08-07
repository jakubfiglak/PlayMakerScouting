const isAdmin = require('../utils/isAdmin');

function setAccessFilters(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      req.accessFilters = {};
      return next();
    }
    req.accessFilters = { $or: [{ _id: { $in: req.acl[`${assetType}s`] } }, { isPublic: true }] };
    next();
  };
}

module.exports = setAccessFilters;
