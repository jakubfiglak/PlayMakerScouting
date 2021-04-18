const isAdmin = require('../utils/isAdmin');

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { authorizedUsers: req.user._id };
  next();
}

module.exports = setAccessFilters;
