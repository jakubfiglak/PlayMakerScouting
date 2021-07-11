const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  updateClub,
  deleteClub,
} = require('../modules/clubs/clubs.controller');
const { protect } = require('../middleware/auth');
const setAcls = require('../middleware/setAcls');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const checkAccessPermission = require('../middleware/checkAccessPermission');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const { setClub, canBeDeleted } = require('../modules/clubs/clubs.middleware');
const options = require('../modules/clubs/options');

const playersRouter = require('./players');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);

router.post('/', [protect, setAcls], createClub);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('club')], getClubs);
router.get('/list', [protect, setAcls, setAccessFilters('club')], getClubsList);
router.get('/:id', [protect, setAcls, setClub, checkAccessPermission('club')], getClub);
router.put(
  '/:id',
  [
    protect,
    setAcls,
    setClub,
    checkAccessPermission('club'),
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updateClub
);
router.delete(
  '/:id',
  [protect, setAcls, setClub, checkAccessPermission('club'), canBeDeleted],
  deleteClub
);

module.exports = router;
