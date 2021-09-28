const getAccessFilters = require('../../utils/getAccessFilters');

function setAccessFilters(req, res, next) {
  req.accessFilters = {
    players: getAccessFilters({ assetType: 'player', userRole: req.user.role, acl: req.acl }),
    clubs: getAccessFilters({ assetType: 'club', userRole: req.user.role, acl: req.acl }),
    notes: getAccessFilters({ assetType: 'note', userRole: req.user.role, acl: req.acl }),
    reports: getAccessFilters({ assetType: 'report', userRole: req.user.role, acl: req.acl }),
    orders: { scout: req.user._id },
  };

  next();
}

module.exports = { setAccessFilters };
