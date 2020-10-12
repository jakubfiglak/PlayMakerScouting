const express = require('express');
const {
  createMatch,
  getMatch,
  getMatches,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchesController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createMatch);
router.get('/', protect, getMatches);
router.get('/:id', protect, getMatch);
router.put('/:id', protect, updateMatch);
router.delete('/:id', [protect, authorize('admin')], deleteMatch);

module.exports = router;
