const isAdmin = require('../utils/isAdmin');

function setAccessFilters(assetType) {
  return function (req, res, next) {
    if (isAdmin(req.user.role)) {
      req.accessFilters = {};
      return next();
    }
    req.accessFilters = { _id: { $in: req.acl[`${assetType}s`] } };
    next();
  };
}

module.exports = setAccessFilters;
