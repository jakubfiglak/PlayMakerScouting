const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  getClubsInVoivodeship,
  getClubsInRadius,
  updateClub,
  deleteClub,
  addToFavorites,
  removeFromFavorites,
  getMyClubs,
} = require('../controllers/clubsController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Club = require('../models/Club');

const playersRouter = require('./players');
const matchesRouter = require('./matches');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);
router.use('/:clubId/matches', protect, matchesRouter);

router.post('/', [protect, authorize('admin')], createClub);
router.get('/', [protect, advancedResults(Club)], getClubs);
router.get('/list', protect, getClubsList);
router.get('/my', protect, getMyClubs);
router.get('/:id', protect, getClub);
router.put('/:id', [protect, authorize('admin')], updateClub);
router.delete('/:id', [protect, authorize('admin')], deleteClub);
router.get('/voivodeship/:voivodeship', protect, getClubsInVoivodeship);
router.get('/radius/activeradius', protect, getClubsInRadius);
router.post('/:id/addtofavorites', protect, addToFavorites);
router.post('/:id/removefromfavorites', protect, removeFromFavorites);

module.exports = router;
