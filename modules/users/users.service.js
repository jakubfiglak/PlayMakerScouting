const User = require('./user.model');

function createUser(reqBody) {
  return User.create(reqBody);
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByConfirmationCode,
};
