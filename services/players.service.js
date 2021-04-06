const dbService = require('./db.service');
const Player = require('../models/player.model');
const getQueryOptions = require('../utils/getQueryOptions');
const prepareQuery = require('../utils/prepareQuery');
const { checkAuthorization } = require('../utils/checkAuthorization');
const checkIfAssetExists = require('../utils/checkIfAssetExists');
const filterForbiddenUpdates = require('../utils/filterForbiddenUpdates');
const checkDbRelations = require('../utils/checkDbRelations');
const checkIfUserHasAccessToTheAsset = require('../utils/checkIfUserHasAccessToTheAsset');

const populate = { path: 'club', select: 'name division' };
const listSelect = 'firstName lastName position';

async function createPlayer({ playerData, userId }) {
  const { club: clubId } = playerData;

  if (clubId) {
    const club = await dbService.getClubById(clubId);

    checkIfAssetExists({ name: 'club', asset: club, assetId: clubId });
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

  const query = prepareQuery(reqQuery);
  query.authorizedUsers = userId;
  const players = await Player.paginate(query, options);

  return players;
}

async function getAllPlayersList() {
  const players = await Player.find().select(listSelect).populate(populate).sort('lastName');
  return players;
}

async function getPlayersListWithAuthorization(userId) {
  const players = await Player.find({ authorizedUsers: userId })
    .select(listSelect)
    .sort('lastName');
  return players;
}

async function getPlayer({ playerId, userId, userRole }) {
  const player = await dbService.getPlayerById(playerId);

  checkIfAssetExists({ name: 'player', asset: player, assetId: playerId });

  checkAuthorization({ userRole, userId, asset: player });
  return player;
}

async function updatePlayer({ playerId, playerData, userId, userRole }) {
  const forbiddenFields = ['authorizedUsers', 'createdAt', 'updatedAt'];
  let player = await dbService.getPlayerById(playerId);
  checkAuthorization({ userRole, userId, asset: player });

  const allowedUpdates = filterForbiddenUpdates({ forbiddenFields, updates: playerData });

  Object.keys(allowedUpdates).forEach((key) => (player[key] = allowedUpdates[key]));

  player = await player.save();
  player = await player.populate(populate).execPopulate();

  return player;
}

async function deletePlayer({ playerId, userId, userRole }) {
  const player = await dbService.getPlayerById(playerId);

  checkIfAssetExists({ name: 'player', asset: player, assetId: playerId });
  checkAuthorization({ userRole, userId, asset: player });

  const orders = await dbService.getOrdersForPlayer(playerId);

  checkDbRelations({ assetName: 'player', relatedAssetName: 'order', relatedDocuments: orders });

  const reports = await dbService.getReportsForPlayer(playerId);

  checkDbRelations({ assetName: 'player', relatedAssetName: 'report', relatedDocuments: reports });

  await player.remove();
}

async function grantAccess({ playerId, userId }) {
  const user = await dbService.getUserById(userId);

  checkIfAssetExists({ name: 'user', asset: user, assetId: userId });

  const player = await dbService.getPlayerById(playerId);

  checkIfAssetExists({ name: 'player', asset: player, assetId: playerId });

  checkIfUserHasAccessToTheAsset({ assetName: 'player', asset: player, assetId: playerId, userId });

  player.authorizedUsers.push(userId);
  await player.save();
}

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayersWithAuthorization,
  getAllPlayersList,
  getPlayersListWithAuthorization,
  getPlayer,
  updatePlayer,
  deletePlayer,
  grantAccess,
};
