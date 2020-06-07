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

const router = express.Router();

router.post('/', [protect, authorize('admin')], createClub);
router.get('/', protect, getClubs);
router.get('/:id', protect, getClub);
router.put('/:id', protect, updateClub);
router.delete('/:id', protect, deleteClub);
router.get('/voivodeship/:voivodeship', protect, getClubsInVoivodeship);
router.get('/radius/activeradius', protect, getClubsInRadius);

module.exports = router;
