const express = require('express');
const {
  createClub,
  getClubs,
  getClub,
  getClubsInVoivodeship,
  getClubsInRadius,
  updateClub,
  deleteClub,
} = require('../controllers/clubsController');
const { protect, authorize } = require('../middleware/auth');

const playerRouter = require('./players');

const router = express.Router();

router.use('/:clubId/players', playerRouter);

router.post('/', [protect, authorize('admin')], createClub);
router.get('/', protect, getClubs);
router.get('/:id', protect, getClub);
router.put('/:id', [protect, authorize('admin')], updateClub);
router.delete('/:id', [protect, authorize('admin')], deleteClub);
router.get('/voivodeship/:voivodeship', protect, getClubsInVoivodeship);
router.get('/radius/activeradius', protect, getClubsInRadius);

module.exports = router;
