const User = require('../models/User');

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const getUserByConfirmationCode = async (confirmationCode) =>
  User.findOne({ confirmationCode });

module.exports = { getUserById, getUserByEmail, getUserByConfirmationCode };
