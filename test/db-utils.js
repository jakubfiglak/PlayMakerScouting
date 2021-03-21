const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Club = require('../models/club.model');
const { buildUser } = require('./utils');

const salt = bcrypt.genSaltSync(10);

const insertUsers = async (users) =>
  User.insertMany(
    users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }))
  );

const insertTestUser = async (overrides = {}) => {
  const user = new User(buildUser(overrides));
  await user.save();
  return { user, token: user.getJwt() };
};

const insertClubs = async (clubs) => {
  Club.insertMany(clubs);
};

module.exports = { insertUsers, insertTestUser, insertClubs };
