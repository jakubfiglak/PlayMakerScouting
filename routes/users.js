const express = require('express');
const {
  getUsers,
  getUser,
  getUsersList,
  deleteUser,
  assignPlaymakerRole,
} = require('../controllers/usersController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/list', getUsersList);
router.get('/:id', getUser);
router.post('/assignplaymaker', assignPlaymakerRole);
router.delete('/:id', deleteUser);

module.exports = router;
