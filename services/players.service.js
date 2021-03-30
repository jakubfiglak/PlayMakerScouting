const httpStatus = require('http-status');
const dbService = require('./db.service');
const Player = require('../models/player.model');
const ApiError = require('../utils/ApiError');
const getQueryOptions = require('../utils/getQueryOptions');
const prepareQuery = require('../utils/prepareQuery');

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

async function getAllPlayers(reqQuery) {
  const { sort, limit, page } = reqQuery;
  const options = { ...getQueryOptions({ sort, limit, page }), populate };

  const query = prepareQuery(reqQuery);
  const players = await Player.paginate(query, options);

  return players;
}

async function getPlayersWithAuthorization({ reqQuery, userId }) {
  const { sort, limit, page } = reqQuery;
  const options = { ...getQueryOptions({ sort, limit, page }), populate };
  console.log(options);

  const query = prepareQuery(reqQuery);
  query.authorizedUsers = userId;
  const players = await Player.paginate(query, options);

  return players;
}

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayersWithAuthorization,
};
