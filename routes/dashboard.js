const express = require('express');
const { getDashboardData } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getDashboardData);

module.exports = router;
