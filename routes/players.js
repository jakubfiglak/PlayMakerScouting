const express = require('express');
const ordersRouter = require('./orders');
const reportsRouter = require('./reports');
const notesRouter = require('./notes');
const {
  createPlayer,
  getPlayers,
  getPlayersList,
  getPlayer,
  updatePlayer,
  deletePlayer,
  mergePlayersDuplicates,
} = require('../modules/players/players.controller');
const Club = require('../modules/clubs/club.model');
const options = require('../modules/players/options');
const { setPlayer, canBeDeleted } = require('../modules/players/players.middleware');
const { protect, authorize } = require('../middleware/auth');
const checkIfRelatedAssetExist = require('../middleware/checkIfRelatedAssetExist');
const setAuthor = require('../middleware/setAuthor');
const setAcls = require('../middleware/setAcls');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const canView = require('../middleware/canView');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const canUpdateOrDelete = require('../middleware/canUpdateOrDelete');

const router = express.Router({ mergeParams: true });

router.use('/:playerId/orders', protect, ordersRouter);
router.use('/:playerId/reports', protect, reportsRouter);
router.use('/:playerId/notes', protect, notesRouter);

router.post(
  '/',
  [protect, setAcls, checkIfRelatedAssetExist({ fieldName: 'club', model: Club }), setAuthor],
  createPlayer
);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('player')], getPlayers);
router.get('/list', [protect, setAcls, setAccessFilters('player')], getPlayersList);
router.get('/:id', [protect, setAcls, setPlayer, canView('player')], getPlayer);
router.put(
  '/:id',
  [
    protect,
    setPlayer,
    canUpdateOrDelete('player'),
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updatePlayer
);
router.delete(
  '/:id',
  [protect, setPlayer, canUpdateOrDelete('player'), canBeDeleted],
  deletePlayer
);
router.post('/merge-duplicates', [protect, authorize('admin')], mergePlayersDuplicates);

module.exports = router;
