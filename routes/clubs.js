const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  updateClub,
  deleteClub,
} = require('../controllers/clubsController');
const { protect, authorize } = require('../middleware/auth');

const playersRouter = require('./players');
const matchesRouter = require('./matches');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);
router.use('/:clubId/matches', protect, matchesRouter);

router.post('/', protect, createClub);
router.get('/', protect, getClubs);
router.get('/list', protect, getClubsList);
router.get('/:id', protect, getClub);
router.put('/:id', protect, updateClub);
router.delete('/:id', [protect, authorize('admin')], deleteClub);

module.exports = router;
