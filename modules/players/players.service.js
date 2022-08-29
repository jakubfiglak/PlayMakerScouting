const Player = require('./player.model');
const resultsOptions = require('./options');
const Report = require('../reports/report.model');
const Order = require('../orders/order.model');
const Note = require('../notes/note.model');
const AccessControlList = require('../accessControlLists/accessControlList.model');
const uniquifyArray = require('../../utils/uniquifyArray');

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
  const options = {
    ...paginationOptions,
    populate: [resultsOptions.populate, 'reportsCount', 'notesCount'],
  };
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

async function getMultiplePlayersClubs(playerIds) {
  const players = await Player.find({ _id: { $in: playerIds } });
  const clubIds = players.map((player) => player.club);
  return uniquifyArray(clubIds);
}

async function mergePlayersDuplicates() {
  // Get all players grouped by Transfermarkt URL
  const results = await Player.aggregate()
    .match({
      $and: [
        { transfermarktProfileURL: { $type: 'string' } },
        { transfermarktProfileURL: { $ne: '' } },
      ],
    })
    .lookup({ from: 'reports', localField: '_id', foreignField: 'player', as: 'reports' })
    .lookup({ from: 'notes', localField: '_id', foreignField: 'player', as: 'notes' })
    .lookup({ from: 'orders', localField: '_id', foreignField: 'player', as: 'orders' })
    .lookup({
      from: 'accesscontrollists',
      let: { playerId: '$_id' },
      pipeline: [{ $match: { $expr: { $in: ['$$playerId', '$players'] } } }],
      as: 'acls',
    })
    .group({
      _id: '$transfermarktProfileURL',
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

  // Set the player field in related note documents to the first player entity ID
  const notesOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx !== 0) {
          return entity.notes.map((note) =>
            Note.updateOne({ _id: note._id }, { $set: { player: result.entities[0]._id } })
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

  // If any of the entities is public, set isPublic field to true in the remaining entity
  const playersToRemainIsPublicOperations = filteredResults
    .map((result) =>
      result.entities.map((entity) => ({ id: entity._id, isPublic: entity.isPublic }))
    )
    .map((e) =>
      Player.updateOne(
        { _id: e[0].id },
        { isPublic: e.map((item) => item.isPublic).some((value) => value) }
      )
    );

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
    ...notesOperations,
    ...ordersOperations,
    ...playersToRemainIsPublicOperations,
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
  getMultiplePlayersClubs,
};
