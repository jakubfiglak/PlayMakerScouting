const express = require('express');
const {
  getUsers,
  getUser,
  deleteUser,
} = require('../controllers/usersController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', advancedResults(User), getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
