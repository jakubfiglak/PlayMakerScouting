const Player = require('./player.model');
const resultsOptions = require('./options');

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
  modifiedPlayer = await player.populate(resultsOptions.populate).execPopulate();

  return modifiedPlayer;
}

async function deletePlayer(player) {
  await player.remove();
}

async function grantAccess({ player, userId }) {
  player.authorizedUsers.push(userId);
  await player.save();
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
};
