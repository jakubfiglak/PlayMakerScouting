const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const usersService = require('../users/users.service');
const ApiError = require('../../utils/ApiError');

const checkIfEmailIsTaken = asyncHandler(async (req, res, next) => {
  const user = await usersService.getUserByEmail(req.body.email);
  if (user) {
    return next(new ApiError('User already exists', httpStatus.BAD_REQUEST));
  }
  next();
});

function checkIfPasswordsMatch({ fieldNameOne, fieldNameTwo }) {
  return function (req, res, next) {
    const match = req.body[fieldNameOne] === req.body[fieldNameTwo];
    if (!match) {
      return next(new ApiError('Passwords do not match', httpStatus.BAD_REQUEST));
    }
    next();
  };
}

function assignConfirmationCode(req, res, next) {
  const confirmationCode = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  req.body.confirmationCode = confirmationCode;
  next();
}

const checkIfUserWithConfirmationCodeExists = asyncHandler(async (req, res, next) => {
  const user = await usersService.getUserByConfirmationCode(req.params.confirmationCode);
  if (!user) {
    return next(new ApiError('User not found', httpStatus.NOT_FOUND));
  }
  req.userData = user;
  next();
});

function validateLoginData(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Please provide an email and a password', httpStatus.BAD_REQUEST));
  }

  next();
}

const checkIfUserExists = asyncHandler(async (req, res, next) => {
  const user = await usersService.getUserByEmail(req.body.email);
  if (!user) {
    return next(new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED));
  }
  req.userData = user;
  next();
});

function checkUserStatus(req, res, next) {
  if (req.userData.status !== 'active') {
    return next(
      new ApiError('Your account is not active, please verify your email', httpStatus.UNAUTHORIZED)
    );
  }
  next();
}

function comparePasswords(fieldName) {
  return asyncHandler(async (req, res, next) => {
    const match = await req.userData.comparePasswords(req.body[fieldName]);
    if (!match) {
      return next(new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED));
    }
    next();
  });
}

const setUser = asyncHandler(async (req, res, next) => {
  const user = await usersService.getUserById(req.user._id);
  if (!user) {
    return next(
      new ApiError(`User not found with the id of ${req.user._id}`, httpStatus.NOT_FOUND)
    );
  }
  req.userData = user;
  next();
});

module.exports = {
  checkIfEmailIsTaken,
  checkIfPasswordsMatch,
  assignConfirmationCode,
  checkIfUserWithConfirmationCodeExists,
  validateLoginData,
  checkIfUserExists,
  checkUserStatus,
  comparePasswords,
  setUser,
};
