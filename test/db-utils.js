const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { buildUser } = require('./utils');

const salt = bcrypt.genSaltSync(10);

const insertUsers = async (users) =>
  User.insertMany(
    users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }))
  );

const insertTestUser = async () => {
  const user = new User(buildUser());
  await user.save();
  return { user, token: user.getJwt() };
};

module.exports = { insertUsers, insertTestUser };
