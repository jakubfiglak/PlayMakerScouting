const httpStatus = require('http-status');
const { clubsService } = require('.');
const Player = require('../models/player.model');
const ApiError = require('../utils/ApiError');

const populate = { path: 'club', select: 'name division' };

function getPlayerById(id) {
  return Player.findById(id);
}

async function createPlayer({ playerData, userId }) {
  const { club: clubId } = playerData;

  if (clubId) {
    const club = await clubsService.getClubById(clubId);

    if (!club) {
      throw new ApiError(`No club found with the id of ${clubId}`, httpStatus.NOT_FOUND);
    }
  }

  let player = await Player.create({ ...playerData, authorizedUsers: [userId] });
  player = await player.populate(populate).execPopulate();
  return player;
}

async function getPlayersForClub(clubId) {
  const players = await Player.find({ club: clubId });
  return players;
}

module.exports = {
  getPlayerById,
  createPlayer,
  getPlayersForClub,
};
