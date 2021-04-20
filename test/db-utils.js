const bcrypt = require('bcryptjs');
const User = require('../modules/users/user.model');
const Club = require('../modules/clubs/club.model');
const Player = require('../modules/players/player.model');
const Order = require('../modules/orders/order.model');
const Report = require('../modules/reports/report.model');
const Rating = require('../modules/ratings/rating.model');
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
  const userData = buildUser(overrides);
  const user = await User.create(userData);
  return { user, token: user.getJwt() };
};

const insertClubs = async (clubs) => {
  Club.insertMany(clubs);
};

const insertPlayers = async (players) => {
  Player.insertMany(players);
};

const insertOrders = async (orders) => {
  Order.insertMany(orders);
};

const insertReports = async (reports) => {
  Report.insertMany(reports);
};

const insertRatings = async (ratings) => {
  Rating.insertMany(ratings);
};

module.exports = {
  insertUsers,
  insertTestUser,
  insertClubs,
  insertPlayers,
  insertOrders,
  insertReports,
  insertRatings,
};
