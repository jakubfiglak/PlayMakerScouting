const Player = require('../models/player.model');
const Club = require('../models/club.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
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
  getOrdersForPlayer,
  getReportsForPlayer,
  getOrderById,
};
