const User = require('../models/user.model');

const getUserById = (id) => User.findById(id);

const getUserByEmail = (email) => User.findOne({ email });

const getUserByConfirmationCode = (confirmationCode) =>
  User.findOne({ confirmationCode });

const createUser = (reqBody) => User.create(reqBody);

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByConfirmationCode,
  createUser,
};
