const Player = require('../models/player.model');
const Club = require('../models/club.model');
const User = require('../models/user.model');

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

module.exports = {
  getPlayerById,
  getPlayersForClub,
  getClubById,
  getUserById,
};
