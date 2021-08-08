const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  updateClub,
  deleteClub,
  mergeClubsDuplicates,
} = require('../modules/clubs/clubs.controller');
const { protect, authorize } = require('../middleware/auth');
const setAcls = require('../middleware/setAcls');
const setAuthor = require('../middleware/setAuthor');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const canView = require('../middleware/canView');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const canUpdateOrDelete = require('../middleware/canUpdateOrDelete');
const { setClub, canBeDeleted } = require('../modules/clubs/clubs.middleware');
const options = require('../modules/clubs/options');

const playersRouter = require('./players');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);

router.post('/', [protect, setAcls, setAuthor], createClub);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('club')], getClubs);
router.get('/list', [protect, setAcls, setAccessFilters('club')], getClubsList);
router.get('/:id', [protect, setAcls, setClub, canView('club')], getClub);
router.put(
  '/:id',
  [protect, setClub, canUpdateOrDelete('club'), filterForbiddenUpdates(options.forbiddenUpdates)],
  updateClub
);
router.delete('/:id', [protect, setClub, canUpdateOrDelete('club'), canBeDeleted], deleteClub);
router.post('/merge-duplicates', [protect, authorize('admin')], mergeClubsDuplicates);

module.exports = router;
