const isAdmin = require('../utils/isAdmin');

function addAuthorToAuthorizedUsers(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.body.authorizedUsers = [];
    return next();
  }
  req.body.authorizedUsers = [req.user._id];

  next();
}

module.exports = addAuthorToAuthorizedUsers;
