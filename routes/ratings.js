const express = require('express');
const {
  createRating,
  deleteRating,
  getRating,
  getRatings,
  updateRating,
} = require('../modules/ratings/ratings.controller');
const { setRating, setAccessFilters, canAccess } = require('../modules/ratings/ratings.middleware');
const setAuthor = require('../middleware/setAuthor');
const { protect } = require('../middleware/auth');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const options = require('../modules/ratings/options');

const router = express.Router();

router.post('/', [protect, setAuthor], createRating);
router.get('/', [protect, setAccessFilters], getRatings);
router.get('/:id', [protect, setRating, canAccess], getRating);
router.put(
  '/:id',
  [protect, setRating, canAccess, filterForbiddenUpdates(options.forbiddenUpdates)],
  updateRating
);
router.delete('/:id', [protect, setRating, canAccess], deleteRating);

module.exports = router;
