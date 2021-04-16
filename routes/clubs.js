const express = require('express');
const {
  createClub,
  getClubs,
  getClubsList,
  getClub,
  updateClub,
  deleteClub,
  grantAccess,
} = require('../modules/clubs/clubs.controller');
const { protect, authorize } = require('../middleware/auth');
const addAuthorToAuthorizedUsers = require('../middleware/addAuthorToAuthorizedUsers');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const checkAccessPermission = require('../middleware/checkAccessPermission');
const checkIfRelatedAssetExist = require('../middleware/checkIfRelatedAssetExist');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const { setClub, canBeDeleted, canAccessBeGranted } = require('../modules/clubs/clubs.middleware');
const options = require('../modules/clubs/options');
const User = require('../modules/users/user.model');

const playersRouter = require('./players');

const router = express.Router();

router.use('/:clubId/players', protect, playersRouter);

router.post('/', [protect, addAuthorToAuthorizedUsers], createClub);
router.get('/', [protect, prepareQuery, setAccessFilters], getClubs);
router.get('/list', [protect, setAccessFilters], getClubsList);
router.get('/:id', [protect, setClub, checkAccessPermission('club')], getClub);
router.put(
  '/:id',
  [
    protect,
    setClub,
    checkAccessPermission('club'),
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updateClub
);
router.delete('/:id', [protect, setClub, checkAccessPermission('club'), canBeDeleted], deleteClub);
router.post(
  '/:id/grantaccess',
  [
    protect,
    authorize('admin'),
    setClub,
    checkIfRelatedAssetExist({ fieldName: 'user', model: User }),
    canAccessBeGranted,
  ],
  grantAccess
);

module.exports = router;
