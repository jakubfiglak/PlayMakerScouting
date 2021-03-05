const express = require('express');
const {
  register,
  login,
  account,
  updateDetails,
  updatePassword,
  verifyUser,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.get('/confirm/:confirmationCode', verifyUser);
router.post('/login', login);
router.get('/account', protect, account);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
