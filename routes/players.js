const express = require('express');
const ordersRouter = require('./orders');
const reportsRouter = require('./reports');
const {
  createPlayer,
  getPlayers,
  getPlayersList,
  getPlayer,
  updatePlayer,
  deletePlayer,
  grantAccess,
} = require('../modules/players/players.controller');
const Club = require('../modules/clubs/club.model');
const User = require('../models/user.model');
const options = require('../modules/players/options');
const {
  setPlayer,
  canBeDeleted,
  canAccessBeGranted,
} = require('../modules/players/players.middleware');
const { protect, authorize } = require('../middleware/auth');
const checkIfRelatedAssetExist = require('../middleware/checkIfRelatedAssetExist');
const addAuthorToAuthorizedUsers = require('../middleware/addAuthorToAuthorizedUsers');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const checkAccessPermission = require('../middleware/checkAccessPermission');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');

const router = express.Router({ mergeParams: true });

router.use('/:playerId/orders', protect, ordersRouter);
router.use('/:playerId/reports', protect, reportsRouter);

router.post(
  '/',
  [
    protect,
    checkIfRelatedAssetExist({ fieldName: 'club', model: Club }),
    addAuthorToAuthorizedUsers,
  ],
  createPlayer
);
router.get('/', [protect, prepareQuery, setAccessFilters], getPlayers);
router.get('/list', [protect, setAccessFilters], getPlayersList);
router.get('/:id', [protect, setPlayer, checkAccessPermission('player')], getPlayer);
router.put(
  '/:id',
  [
    protect,
    setPlayer,
    checkAccessPermission('player'),
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updatePlayer
);
router.delete(
  '/:id',
  [protect, setPlayer, checkAccessPermission('player'), canBeDeleted],
  deletePlayer
);
router.post(
  '/:id/grantaccess',
  [
    protect,
    authorize('admin'),
    setPlayer,
    checkIfRelatedAssetExist({ fieldName: 'user', model: User }),
    canAccessBeGranted,
  ],
  grantAccess
);

module.exports = router;
