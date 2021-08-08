const express = require('express');
const {
  createReport,
  getReports,
  getReportsList,
  getReport,
  updateReport,
  deleteReport,
  setReportStatus,
} = require('../modules/reports/reports.controller');
const { protect, authorize } = require('../middleware/auth');
const {
  setOrderData,
  checkOrderStatus,
  setPlayerData,
  setReport,
  setCurrentClub,
  canBeUpdated,
} = require('../modules/reports/reports.middleware');
const setAuthor = require('../middleware/setAuthor');
const prepareQuery = require('../middleware/prepareQuery');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const setAcls = require('../middleware/setAcls');
const setAccessFilters = require('../middleware/setAccessFilters');
const canView = require('../middleware/canView');
const canUpdateOrDelete = require('../middleware/canUpdateOrDelete');
const options = require('../modules/reports/options');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  [protect, setAcls, setAuthor, setOrderData, checkOrderStatus, setPlayerData, setCurrentClub],
  createReport
);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('report')], getReports);
router.get('/list', [protect, authorize('admin')], getReportsList);
router.get('/:id', [protect, setAcls, setReport, canView('report')], getReport);
router.put(
  '/:id',
  [
    protect,
    setReport,
    canUpdateOrDelete('report'),
    canBeUpdated,
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updateReport
);
router.patch('/:id/set-status', [protect, setReport, canUpdateOrDelete('report')], setReportStatus);
router.delete('/:id', [protect, setReport, canUpdateOrDelete('report')], deleteReport);

module.exports = router;
