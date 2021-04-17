const express = require('express');
const {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} = require('../modules/reports/reports.controller');
const { protect } = require('../middleware/auth');
const {
  setAuthor,
  setOrderData,
  checkOrderStatus,
  setPlayerData,
  setIndividualSkills,
  setAccessFilters,
  setReport,
  checkAccessPermission,
} = require('../modules/reports/reports.middleware');
const prepareQuery = require('../middleware/prepareQuery');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const options = require('../modules/reports/options');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  [protect, setAuthor, setOrderData, checkOrderStatus, setPlayerData, setIndividualSkills],
  createReport
);
router.get('/', [protect, prepareQuery, setAccessFilters], getReports);
router.get('/:id', [protect, setReport, checkAccessPermission], getReport);
router.put(
  '/:id',
  [
    protect,
    setReport,
    checkAccessPermission,
    filterForbiddenUpdates(options.forbiddenUpdates),
    setIndividualSkills,
  ],
  updateReport
);
router.delete('/:id', [protect, setReport, checkAccessPermission], deleteReport);

module.exports = router;
