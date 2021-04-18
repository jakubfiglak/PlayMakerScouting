const express = require('express');
const { getDashboardData } = require('../modules/dashboard/dashboard.controller');
const { setAccessFilters } = require('../modules/dashboard/dashboard.middleware');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect, setAccessFilters], getDashboardData);

module.exports = router;
