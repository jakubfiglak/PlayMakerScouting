const express = require('express');
const {
  getUsers,
  getUser,
  getUsersList,
  changeRole,
  goToTheMatch,
  leaveTheMatch,
} = require('../modules/users/users.controller');
const { setUser, checkRole, setCurrentUserData } = require('../modules/users/users.middleware');
const { protect, authorize } = require('../middleware/auth');
const prepareQuery = require('../middleware/prepareQuery');

const router = express.Router();

router.get('/', [protect, authorize('admin'), prepareQuery], getUsers);
router.get('/list', [protect, authorize('admin')], getUsersList);
router.get('/:id', [protect, authorize('admin'), setUser], getUser);
router.post(
  '/:id/change-role',
  [protect, authorize('admin'), setUser, checkRole(['scout', 'playmaker-scout'])],
  changeRole
);
router.patch('/go-to-the-match', [protect, setCurrentUserData], goToTheMatch);
router.patch('/leave-the-match', [protect, setCurrentUserData], leaveTheMatch);

module.exports = router;
