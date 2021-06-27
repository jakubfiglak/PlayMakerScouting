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
router.delete('/:id', [protect, setAcls, setReport, checkAccessPermission('report')], deleteReport);

module.exports = router;
