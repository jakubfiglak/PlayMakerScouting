const express = require('express');
const {
  getReportBackgroundImages,
} = require('../modules/reportBackgroundImages/reportBackgroundImages.controller');
const {
  setAccessFilters,
} = require('../modules/reportBackgroundImages/reportBackgroundImages.middleware');
const setAcls = require('../middleware/setAcls');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect, setAcls, setAccessFilters], getReportBackgroundImages);

module.exports = router;
