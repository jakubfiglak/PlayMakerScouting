const express = require('express');
const {
  getReportBackgroundImages,
} = require('../modules/reportBackgroundImages/reportBackgroundImages.controller');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect], getReportBackgroundImages);

module.exports = router;
