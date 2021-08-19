const express = require('express');
const notesRouter = require('./notes');
const {
  createMatch,
  getMatches,
  getMatchesList,
  getMatch,
  updateMatch,
  deleteMatch,
} = require('../modules/matches/matches.controller');
const Club = require('../modules/clubs/club.model');
const { setMatch, canBeDeleted } = require('../modules/matches/matches.middleware');
const options = require('../modules/matches/options');
const { protect } = require('../middleware/auth');
const checkIfRelatedAssetExist = require('../middleware/checkIfRelatedAssetExist');
const setAuthor = require('../middleware/setAuthor');
const setAcls = require('../middleware/setAcls');
const prepareQuery = require('../middleware/prepareQuery');
const setAccessFilters = require('../middleware/setAccessFilters');
const canView = require('../middleware/canView');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const canUpdateOrDelete = require('../middleware/canUpdateOrDelete');

const router = express.Router({ mergeParams: true });

router.use('/:matchId/notes', protect, notesRouter);
router.post(
  '/',
  [
    protect,
    setAcls,
    checkIfRelatedAssetExist({ fieldName: 'homeTeam', model: Club }),
    checkIfRelatedAssetExist({ fieldName: 'awayTeam', model: Club }),
    setAuthor,
  ],
  createMatch
);

router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('match')], getMatches);

router.get('/list', [protect, setAcls, setAccessFilters('match')], getMatchesList);

router.get('/:id', [protect, setAcls, setMatch, canView('match')], getMatch);

router.put(
  '/:id',
  [protect, setMatch, canUpdateOrDelete('match'), filterForbiddenUpdates(options.forbiddenUpdates)],
  updateMatch
);

router.delete('/:id', [protect, setMatch, canUpdateOrDelete('match'), canBeDeleted], deleteMatch);

module.exports = router;
