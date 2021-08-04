const Player = require('./player.model');
const resultsOptions = require('./options');
const Report = require('../reports/report.model');
const Order = require('../orders/order.model');
const AccessControlList = require('../accessControlLists/accessControlList.model');

function getPlayerById(id) {
  return Player.findById(id);
}

async function getPlayersForClub(clubId) {
  const players = await Player.find({ club: clubId });
  return players;
}

async function createPlayer(playerData) {
  let player = await Player.create(playerData);
  player = await player.populate(resultsOptions.populate).execPopulate();
  return player;
}

async function getAllPlayers({ query, paginationOptions, accessFilters }) {
  const modifiedQuery = { ...query, ...accessFilters };
  const options = { ...paginationOptions, populate: resultsOptions.populate };
  const players = await Player.paginate(modifiedQuery, options);
  return players;
}

async function getAllPlayersList(accessFilters) {
  const players = await Player.find({ ...accessFilters })
    .select(resultsOptions.listSelect)
    .populate(resultsOptions.populate)
    .sort(resultsOptions.listSort);
  return players;
}

async function updatePlayer({ player, reqBody }) {
  const editedPlayer = player;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedPlayer[key] = reqBody[key];
    }
  });

  let modifiedPlayer = await editedPlayer.save();
  modifiedPlayer = await editedPlayer.populate(resultsOptions.populate).execPopulate();

  return modifiedPlayer;
}

async function deletePlayer(player) {
  await player.remove();
}

async function grantAccess({ player, userId }) {
  player.authorizedUsers.push(userId);
  await player.save();
}

function getPlayersCount(accessFilters) {
  return Player.countDocuments(accessFilters);
}

async function mergePlayersDuplicates() {
  // Get all players grouped by LNP ID
  const results = await Player.aggregate()
    .match({ $and: [{ lnpID: { $type: 'string' } }, { lnpID: { $ne: '' } }] })
    .lookup({ from: 'reports', localField: '_id', foreignField: 'player', as: 'reports' })
    .lookup({ from: 'orders', localField: '_id', foreignField: 'player', as: 'orders' })
    .lookup({
      from: 'accesscontrollists',
      let: { playerId: '$_id' },
      pipeline: [{ $match: { $expr: { $in: ['$$playerId', '$players'] } } }],
      as: 'acls',
    })
    .group({
      _id: '$lnpID',
      ids: { $push: '$$ROOT._id' },
      entities: { $push: '$$ROOT' },
    });

  // Filter out players with only one definition
  const filteredResults = results.filter((player) => player.entities.length !== 1);

  // Set the player field in related report documents to the first player entity ID
  const reportsOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx !== 0) {
          return entity.reports.map((report) =>
            Report.updateOne({ _id: report._id }, { $set: { player: result.entities[0]._id } })
          );
        }
        return null;
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Set the player field in related order documents to the first player entity ID
  const ordersOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx !== 0) {
          return entity.orders.map((order) =>
            Order.updateOne({ _id: order._id }, { $set: { player: result.entities[0]._id } })
          );
        }
        return null;
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Edit access control lists - for each access control list containing
  // the player to be removed, add the entity to be kept in the database
  const aclsPushOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return entity.acls.map((acl) =>
          AccessControlList.updateOne(
            { _id: acl._id },
            { $push: { players: result.entities[0]._id } }
          )
        );
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  const aclsPullOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return entity.acls.map((acl) =>
          AccessControlList.updateOne({ _id: acl._id }, { $pull: { players: entity._id } })
        );
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Remove duplicate player entities
  const playersOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return Player.deleteOne({ _id: entity._id });
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  return Promise.all([
    ...reportsOperations,
    ...ordersOperations,
    ...aclsPushOperations,
    ...aclsPullOperations,
    ...playersOperations,
  ]);
}

module.exports = {
  createPlayer,
  getAllPlayers,
  getAllPlayersList,
  updatePlayer,
  deletePlayer,
  grantAccess,
  getPlayerById,
  getPlayersForClub,
  getPlayersCount,
  mergePlayersDuplicates,
};
