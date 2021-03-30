const httpStatus = require('http-status');
const dbService = require('./db.service');
const Player = require('../models/player.model');
const ApiError = require('../utils/ApiError');

const populate = { path: 'club', select: 'name division' };

async function createPlayer({ playerData, userId }) {
  const { club: clubId } = playerData;

  if (clubId) {
    const club = await dbService.getClubById(clubId);

    if (!club) {
      throw new ApiError(`No club found with the id of ${clubId}`, httpStatus.NOT_FOUND);
    }
  }

  let player = await Player.create({ ...playerData, authorizedUsers: [userId] });
  player = await player.populate(populate).execPopulate();
  return player;
}

module.exports = {
  createPlayer,
};
