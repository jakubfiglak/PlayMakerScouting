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
  setAuthor,
  setOrderData,
  checkOrderStatus,
  setPlayerData,
  setReport,
  setCurrentClub,
  canBeUpdated,
} = require('../modules/reports/reports.middleware');
const prepareQuery = require('../middleware/prepareQuery');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const setAcls = require('../middleware/setAcls');
const setAccessFilters = require('../middleware/setAccessFilters');
const checkAccessPermission = require('../middleware/checkAccessPermission');
const options = require('../modules/reports/options');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  [protect, setAcls, setAuthor, setOrderData, checkOrderStatus, setPlayerData, setCurrentClub],
  createReport
);
router.get('/', [protect, setAcls, prepareQuery, setAccessFilters('report')], getReports);
router.get('/list', [protect, authorize('admin')], getReportsList);
router.get('/:id', [protect, setAcls, setReport, checkAccessPermission('report')], getReport);
router.put(
  '/:id',
  [
    protect,
    setAcls,
    setReport,
    checkAccessPermission('report'),
    canBeUpdated,
    filterForbiddenUpdates(options.forbiddenUpdates),
  ],
  updateReport
);
router.patch(
  '/:id/set-status',
  [protect, setAcls, setReport, checkAccessPermission('report')],
  setReportStatus
);
router.delete('/:id', [protect, setAcls, setReport, checkAccessPermission('report')], deleteReport);

module.exports = router;
