const Player = require('../modules/players/player.model');
const Club = require('../modules/clubs/club.model');
const User = require('../modules/users/user.model');
const Order = require('../modules/orders/order.model');
const Report = require('../models/report.model');

function getPlayerById(id) {
  return Player.findById(id);
}

async function getPlayersForClub(clubId) {
  const players = await Player.find({ club: clubId });
  return players;
}

function getClubById(id) {
  return Club.findById(id);
}

function getUserById(id) {
  return User.findById(id);
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
}

async function getOrdersForPlayer(playerId) {
  const orders = await Order.find({ player: playerId });
  return orders;
}

async function getReportsForPlayer(playerId) {
  const reports = await Report.find({ player: playerId });
  return reports;
}

function getOrderById(id) {
  return Order.findById(id);
}

module.exports = {
  getPlayerById,
  getPlayersForClub,
  getClubById,
  getUserById,
  getUserByEmail,
  getUserByConfirmationCode,
  getOrdersForPlayer,
  getReportsForPlayer,
  getOrderById,
};
