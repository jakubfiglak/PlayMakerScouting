const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { emailService, usersService } = require('.');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

async function registerUser({ reqBody, host }) {
  const { email, password, passwordConfirm } = reqBody;

  let user = await usersService.getUserByEmail(email);

  if (user) {
    throw new ApiError('User already exists', httpStatus.BAD_REQUEST);
  }

  if (password !== passwordConfirm) {
    throw new ApiError('Passwords do not match', httpStatus.BAD_REQUEST);
  }

  const confirmationCode = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  user = await usersService.createUser({ ...reqBody, confirmationCode });

  const confirmationURL = `http://${host}/confirm/${confirmationCode}`;

  await emailService.sendEmail({
    to: email,
    subject: 'Aktywuj swoje konto w aplikacji PlaymakerPro Scouting',
    text: `Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w link ${confirmationURL}`,
    html: `<h2>Witaj ${user.firstName}</h2>
            <p>Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w <a href="${confirmationURL}">link</a></p>
          `,
  });

  return user;
}

async function verifyUser(confirmationCode) {
  let user = await usersService.getUserByConfirmationCode(confirmationCode);

  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }

  user.status = 'active';
  user.confirmationCode = undefined;

  user = await user.save();
  return user;
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new ApiError('Please provide an email and a password', httpStatus.BAD_REQUEST);
  }

  const user = await usersService.getUserByEmail(email);

  if (!user) {
    throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  if (user.status !== 'active') {
    throw new ApiError(
      'Your account is not active, please verify your email',
      httpStatus.UNAUTHORIZED
    );
  }

  const match = await user.comparePasswords(password);

  if (!match) {
    throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  const token = user.getJwt();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return { user, token, expiresAt: decoded.exp };
}
async function updatePassword({ userId, reqBody }) {
  const { oldPassword, newPassword, newPasswordConfirm } = reqBody;
  const user = await usersService.getUserById(userId);
  const match = await user.comparePasswords(oldPassword);
  if (!match) {
    throw new ApiError('Incorrect password', httpStatus.UNAUTHORIZED);
  }

  if (newPassword !== newPasswordConfirm) {
    throw new ApiError('Passwords do not match', httpStatus.BAD_REQUEST);
  }

  user.password = newPassword;
  await user.save({ validateModifiedOnly: true });

  const token = user.getJwt();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return { token, expiresAt: decoded.exp };
}

async function updateDetails({ id, reqBody }) {
  // Keys which user cannot update manually
  const forbiddenKeys = [
    'email',
    'password',
    'role',
    'status',
    'confirmationCode',
    'resetPasswordToken',
    'resetPasswordExpires',
    'createdAt',
    'updatedAt',
  ];

  const updates = Object.fromEntries(
    Object.entries(reqBody).filter(([key, value]) => !forbiddenKeys.includes(key) && value !== '')
  );

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  return user;
}

module.exports = {
  registerUser,
  verifyUser,
  login,
  updateDetails,
  updatePassword,
};
