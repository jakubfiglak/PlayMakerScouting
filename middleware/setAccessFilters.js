const isAdmin = require('../utils/isAdmin');

function setOrdersAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { $or: [{ scout: req.user._id }, { status: 'open' }] };
  next();
}

module.exports = { setOrdersAccessFilters };
