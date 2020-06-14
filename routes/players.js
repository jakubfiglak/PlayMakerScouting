const express = require('express');
const {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playersController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createPlayer);
router.get('/', protect, getPlayers);
router.get('/:id', protect, getPlayer);
router.put('/:id', protect, updatePlayer);
router.delete('/:id', [protect, authorize('admin')], deletePlayer);

module.exports = router;
