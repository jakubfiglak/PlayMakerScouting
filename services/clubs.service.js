const dbService = require('./db.service');
const Club = require('../models/club.model');
const prepareQuery = require('../utils/prepareQuery');
const getQueryOptions = require('../utils/getQueryOptions');
const { checkAuthorization } = require('../utils/checkAuthorization');
const filterForbiddenUpdates = require('../utils/filterForbiddenUpdates');
const checkIfAssetExists = require('../utils/checkIfAssetExists');
const checkIfUserHasAccessToTheAsset = require('../utils/checkIfUserHasAccessToTheAsset');
const checkDbRelations = require('../utils/checkDbRelations');

async function createClub({ clubData, userId }) {
  const club = await Club.create({ ...clubData, authorizedUsers: [userId] });
  return club;
}

async function getAllClubs(reqQuery) {
  const { sort, limit, page } = reqQuery;
  const options = getQueryOptions({ sort, limit, page });

  const query = prepareQuery(reqQuery);

  const clubs = await Club.paginate(query, options);

  return clubs;
}

async function getClubsWithAuthorization({ reqQuery, userId }) {
  const { sort, limit, page } = reqQuery;
  const options = getQueryOptions({ sort, limit, page });

  const query = prepareQuery(reqQuery);
  query.authorizedUsers = userId;

  const clubs = await Club.paginate(query, options);

  return clubs;
}

async function getAllClubsList() {
  const clubs = await Club.find().select('name').sort('name');
  return clubs;
}

async function getClubsListWithAuthorization(userId) {
  const clubs = await Club.find({ authorizedUsers: userId }).select('name').sort('name');
  return clubs;
}

async function getClub({ clubId, userId, userRole }) {
  const club = await dbService.getClubById(clubId);

  checkIfAssetExists({ name: 'club', asset: club, assetId: clubId });

  checkAuthorization({ userRole, userId, asset: club });
  return club;
}

async function updateClub({ clubId, clubData, userId, userRole }) {
  const forbiddenFields = ['authorizedUsers', 'createdAt', 'updatedAt'];
  let club = await dbService.getClubById(clubId);

  checkAuthorization({ userRole, userId, asset: club });

  const allowedUpdates = filterForbiddenUpdates({ forbiddenFields, updates: clubData });

  Object.keys(allowedUpdates).forEach((key) => (club[key] = allowedUpdates[key]));

  club = await club.save();

  return club;
}

async function deleteClub({ clubId, userId, userRole }) {
  const club = await dbService.getClubById(clubId);

  checkIfAssetExists({ name: 'club', asset: club, assetId: clubId });
  checkAuthorization({ userRole, userId, asset: club });

  const players = await dbService.getPlayersForClub(clubId);

  checkDbRelations({ assetName: 'club', relatedAssetName: 'player', relatedDocuments: players });

  await club.remove();
}

async function grantAccess({ clubId, userId }) {
  const user = await dbService.getUserById(userId);

  checkIfAssetExists({ name: 'user', asset: user, assetId: userId });

  const club = await dbService.getClubById(clubId);

  checkIfAssetExists({ name: 'club', asset: club, assetId: clubId });

  checkIfUserHasAccessToTheAsset({ assetName: 'club', asset: club, assetId: clubId, userId });

  club.authorizedUsers.push(userId);
  await club.save();
}

module.exports = {
  createClub,
  getAllClubs,
  getAllClubsList,
  getClubsWithAuthorization,
  getClubsListWithAuthorization,
  getClub,
  updateClub,
  deleteClub,
  grantAccess,
};
