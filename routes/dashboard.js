const express = require('express');
const { getDashboardData } = require('../modules/dashboard/dashboard.controller');
const { setAccessFilters } = require('../modules/dashboard/dashboard.middleware');
const { protect } = require('../middleware/auth');
const setAcls = require('../middleware/setAcls');

const router = express.Router();

router.get('/', [protect, setAcls, setAccessFilters], getDashboardData);

module.exports = router;
