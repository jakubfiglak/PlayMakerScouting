const isAdmin = require('../../utils/isAdmin');

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {
      playersAndClubs: {},
      ordersAndReports: {},
    };
    return next();
  }
  req.accessFilters = {
    playersAndClubs: { authorizedUsers: req.user._id },
    ordersAndReports: { scout: req.user._id },
  };
}

module.exports = { setAccessFilters };
