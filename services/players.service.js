const Player = require('../models/player.model');

async function getPlayersForClub(clubId) {
  const players = await Player.find({ club: clubId });
  return players;
}

module.exports = {
  getPlayersForClub,
};
