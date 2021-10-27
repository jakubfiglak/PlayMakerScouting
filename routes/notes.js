const express = require('express');
const {
  createNote,
  getNotes,
  getNotesList,
  getNote,
  updateNote,
  deleteNote,
} = require('../modules/notes/notes.controller');
const { protect } = require('../middleware/auth');
const {
  setNote,
  setPlayerData,
  setCurrentClub,
  filterNullishValues,
} = require('../modules/notes/notes.middleware');
const setAuthor = require('../middleware/setAuthor');
const prepareQuery = require('../middleware/prepareQuery');
const checkIfRelatedAssetExists = require('../middleware/checkIfRelatedAssetExist');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const setAcls = require('../middleware/setAcls');
const setAccessFilters = require('../middleware/setAccessFilters');
const canView = require('../middleware/canView');
const canUpdateOrDelete = require('../middleware/canUpdateOrDelete');
const options = require('../modules/notes/options');
const Match = require('../modules/matches/match.model');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  [
    protect,
    setAcls,
    setAuthor,
    filterNullishValues,
    checkIfRelatedAssetExists({ fieldName: 'match', model: Match }),
    setPlayerData,
    setCurrentClub,
  ],
  createNote
);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('note')], getNotes);
router.get('/list', [protect, setAcls, prepareQuery, setAccessFilters('note')], getNotesList);
router.get('/:id', [protect, setAcls, setNote, canView('note')], getNote);
router.put(
  '/:id',
  [
    protect,
    setNote,
    canUpdateOrDelete('note'),
    filterNullishValues,
    filterForbiddenUpdates(options.forbiddenUpdates),
    setPlayerData,
    setCurrentClub,
  ],
  updateNote
);
router.delete('/:id', [protect, setNote, canUpdateOrDelete('note')], deleteNote);

module.exports = router;
