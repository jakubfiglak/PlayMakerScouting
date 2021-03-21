const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  updateClub,
  deleteClub,
  grantAccess,
} = require('../controllers/clubs.controller');
const { protect, authorize } = require('../middleware/auth');

const playersRouter = require('./players');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);

router.post('/', protect, createClub);
router.get('/', protect, getClubs);
router.get('/list', protect, getClubsList);
router.get('/:id', protect, getClub);
router.put('/:id', protect, updateClub);
router.delete('/:id', [protect, authorize('admin')], deleteClub);
router.post('/grantaccess', [protect, authorize('admin')], grantAccess);

module.exports = router;
