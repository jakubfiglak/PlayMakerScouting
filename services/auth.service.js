const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const emailService = require('./email.service');
const usersService = require('./users.service');

const registerUser = async ({ reqBody, host }) => {
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

  user = await User.create({ ...reqBody, confirmationCode });

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
};

const verifyUser = async (confirmationCode) => {
  let user = await usersService.getUserByConfirmationCode(confirmationCode);

  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }

  user.status = 'active';
  user.confirmationCode = undefined;

  user = await user.save();
  return user;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(
      'Please provide an email and a password',
      httpStatus.BAD_REQUEST
    );
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
};

const updateDetails = async ({ id, reqBody }) => {
  const updates = Object.fromEntries(
    Object.entries(reqBody).filter(([_, value]) => value !== '')
  );

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  return user;
};

const updatePassword = async ({ userId, reqBody }) => {
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
};

module.exports = {
  registerUser,
  verifyUser,
  login,
  updateDetails,
  updatePassword,
};
