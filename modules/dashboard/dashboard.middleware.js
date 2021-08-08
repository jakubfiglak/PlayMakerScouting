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
    players: { $or: [{ _id: { $in: req.acl.players } }, { isPublic: true }] },
    clubs: { $or: [{ _id: { $in: req.acl.clubs } }, { isPublic: true }] },
    reports: { _id: { $in: req.acl.reports } },
    orders: { scout: req.user._id },
  };
  next();
}

module.exports = { setAccessFilters };
