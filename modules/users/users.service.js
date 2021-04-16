const User = require('./user.model');

function getUserById(id) {
  return User.findById(id);
}
function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
}

function createUser(reqBody) {
  return User.create(reqBody);
}

function getUserByEmail(email) {
  return User.findOne({ email });
}
module.exports = {
  createUser,
  getUserByEmail,
  getUserByConfirmationCode,
  getUserById,
};
