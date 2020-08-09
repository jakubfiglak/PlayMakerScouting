const express = require('express');
const {
  createMatch,
  getMatch,
  getMatches,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchesController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Match = require('../models/Match');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createMatch);
router.get(
  '/',
  [
    protect,
    advancedResults(Match, [
      { path: 'homeTeam', select: 'name' },
      { path: 'awayTeam', select: 'name' },
    ]),
  ],
  getMatches
);
router.get('/:id', protect, getMatch);
router.put('/:id', protect, updateMatch);
router.delete('/:id', [protect, authorize('admin')], deleteMatch);

module.exports = router;
