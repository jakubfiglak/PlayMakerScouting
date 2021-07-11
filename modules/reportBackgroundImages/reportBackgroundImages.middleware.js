const isAdmin = require('../../utils/isAdmin');

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }

  req.accessFilters = {
    $or: [{ _id: { $in: req.acl.reportBackgroundImages } }, { isPublic: true }],
  };

  next();
}

module.exports = { setAccessFilters };
