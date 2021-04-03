const express = require('express');
const {
  createPlayer,
  getPlayers,
  getPlayersList,
  getPlayer,
  updatePlayer,
  deletePlayer,
  grantAccess,
} = require('../controllers/players.controller');
const { protect, authorize } = require('../middleware/auth');

const ordersRouter = require('./orders');
const reportsRouter = require('./reports');

const router = express.Router({ mergeParams: true });

router.use('/:playerId/orders', protect, ordersRouter);
router.use('/:playerId/reports', protect, reportsRouter);

router.post('/', protect, createPlayer);
router.get('/', protect, getPlayers);
router.get('/list', protect, getPlayersList);
router.post('/grantaccess', [protect, authorize('admin')], grantAccess);
router.get('/:id', protect, getPlayer);
router.put('/:id', protect, updatePlayer);
router.delete('/:id', protect, deletePlayer);

module.exports = router;
