const User = require('../models/user.model');

function getUserById(id) {
  return User.findById(id);
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
}

function createUser(reqBody) {
  return User.create(reqBody);
}

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByConfirmationCode,
  createUser,
};
