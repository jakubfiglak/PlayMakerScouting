const express = require('express');
const {
  register,
  login,
  account,
  updateDetails,
  updatePassword,
  verifyUser,
} = require('../modules/auth/auth.controller');
const { protect } = require('../middleware/auth');
const filterForbiddenUpdates = require('../middleware/filterForbiddenUpdates');
const {
  checkIfEmailIsTaken,
  checkIfPasswordsMatch,
  assignConfirmationCode,
  checkIfUserWithConfirmationCodeExists,
  validateLoginData,
  checkIfUserExists,
  checkUserStatus,
  comparePasswords,
  setUser,
} = require('../modules/auth/auth.middleware');
const options = require('../modules/auth/options');

const router = express.Router();

router.post(
  '/register',
  [
    checkIfEmailIsTaken,
    checkIfPasswordsMatch({ fieldNameOne: 'password', fieldNameTwo: 'passwordConfirm' }),
    assignConfirmationCode,
  ],
  register
);
router.get('/confirm/:confirmationCode', checkIfUserWithConfirmationCodeExists, verifyUser);
router.post(
  '/login',
  [validateLoginData, checkIfUserExists, checkUserStatus, comparePasswords('password')],
  login
);
router.get('/account', protect, account);
router.put(
  '/updatedetails',
  [protect, setUser, filterForbiddenUpdates(options.forbiddenUpdates)],
  updateDetails
);
router.put(
  '/updatepassword',
  [
    protect,
    setUser,
    comparePasswords('oldPassword'),
    checkIfPasswordsMatch({ fieldNameOne: 'newPassword', fieldNameTwo: 'newPasswordConfirm' }),
  ],
  updatePassword
);

module.exports = router;
