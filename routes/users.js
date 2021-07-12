const express = require('express');
const {
  getUsers,
  getUser,
  getUsersList,
  changeRole,
} = require('../modules/users/users.controller');
const { setUser, checkRole } = require('../modules/users/users.middleware');
const { protect, authorize } = require('../middleware/auth');
const prepareQuery = require('../middleware/prepareQuery');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', prepareQuery, getUsers);
router.get('/list', getUsersList);
router.get('/:id', setUser, getUser);
router.post('/:id/change-role', [setUser, checkRole(['scout', 'playmaker-scout'])], changeRole);

module.exports = router;
