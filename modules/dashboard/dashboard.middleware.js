const isAdmin = require('../../utils/isAdmin');

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {
      players: {},
      clubs: {},
      orders: {},
      reports: {},
    };
    return next();
  }
  req.accessFilters = {
    players: { _id: { $in: req.acl.players } },
    clubs: { _id: { $in: req.acl.clubs } },
    reports: { _id: { $in: req.acl.reports } },
    orders: { scout: req.user._id },
  };
  next();
}

module.exports = { setAccessFilters };
