const express = require('express');
const {
  createReportTemplate,
  deleteReportTemplate,
  getReportTemplate,
  getReportTemplates,
  updateReportTemplate,
} = require('../modules/reportTemplates/reportTemplates.controller');
const {
  setReportTemplate,
  setAccessFilters,
  setAuthor,
  canAccess,
  validateRatings,
} = require('../modules/reportTemplates/reportTemplates.middleware');
const { protect } = require('../middleware/auth');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const options = require('../modules/reportTemplates/options');

const router = express.Router();

router.post('/', [protect, validateRatings, setAuthor], createReportTemplate);
router.get('/', [protect, setAccessFilters], getReportTemplates);
router.get('/:id', [protect, setReportTemplate, canAccess], getReportTemplate);
router.put(
  '/:id',
  [
    protect,
    setReportTemplate,
    canAccess,
    validateRatings,
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updateReportTemplate
);
router.delete('/:id', [protect, setReportTemplate, canAccess], deleteReportTemplate);

module.exports = router;
