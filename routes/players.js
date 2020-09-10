const express = require('express');
const {
  createPlayer,
  getPlayers,
  getPlayersList,
  getPlayer,
  updatePlayer,
  deletePlayer,
  getMyPlayers,
  grantAccess,
} = require('../controllers/playersController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Player = require('../models/Player');

const ordersRouter = require('./orders');
const reportsRouter = require('./reports');
const matchesRouter = require('./matches');

const router = express.Router({ mergeParams: true });

router.use('/:playerId/orders', protect, ordersRouter);
router.use('/:playerId/reports', protect, reportsRouter);
router.use('/:playerId/matches', protect, matchesRouter);

router.post('/', protect, createPlayer);
router.get(
  '/',
  [
    protect,
    authorize('admin'),
    advancedResults(Player, [{ path: 'club', select: 'name' }, 'reports']),
  ],
  getPlayers
);
router.get('/list', protect, getPlayersList);
router.get('/my', protect, getMyPlayers);
router.post('/grantaccess', [protect, authorize('admin')], grantAccess);
router.get('/:id', protect, getPlayer);
router.put('/:id', protect, updatePlayer);
router.delete('/:id', [protect, authorize('admin')], deletePlayer);

module.exports = router;
