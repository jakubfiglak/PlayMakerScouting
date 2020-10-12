const express = require('express');
const {
  getUsers,
  getUser,
  deleteUser,
} = require('../controllers/usersController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
