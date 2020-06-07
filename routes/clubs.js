const express = require('express');
const { createClub } = require('../controllers/clubsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createClub);

module.exports = router;
