const httpStatus = require('http-status');
const { playersService, usersService } = require('.');
const Club = require('../models/club.model');
const ApiError = require('../utils/ApiError');
const prepareQuery = require('../utils/prepareQuery');

async function createClub({ clubData, userId }) {
  const club = await Club.create({ ...clubData, authorizedUsers: [userId] });
  return club;
}

function getClubById(id) {
  return Club.findById(id);
}

async function getAllClubs(reqQuery) {
  const options = {
    sort: reqQuery.sort || '_id',
    limit: reqQuery.limit || 20,
    page: reqQuery.page || 1,
  };

  const query = prepareQuery(reqQuery);

  const clubs = await Club.paginate(query, options);

  return clubs;
}

async function getClubsWithAuthorization({ reqQuery, userId }) {
  const options = {
    sort: reqQuery.sort || '_id',
    limit: reqQuery.limit || 20,
    page: reqQuery.page || 1,
  };

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
  const club = await getClubById(clubId);

  if (!club) {
    throw new ApiError(`Club not found with id of ${clubId}`, httpStatus.NOT_FOUND);
  }

  const isAuthorized = userRole === 'admin' || club.authorizedUsers.includes(userId);

  if (!isAuthorized) {
    throw new ApiError(
      `You don't have access to the club with the id of ${clubId}`,
      httpStatus.UNAUTHORIZED
    );
  }
  return club;
}

async function updateClub({ clubId, clubData, userId, userRole }) {
  const forbiddenKeys = ['authorizedUsers'];
  let club = await getClubById(clubId);

  const isAuthorized = userRole === 'admin' || club.authorizedUsers.includes(userId);

  if (!isAuthorized) {
    throw new ApiError(
      `You don't have access to the club with the id of ${clubId}`,
      httpStatus.UNAUTHORIZED
    );
  }

  const updates = Object.fromEntries(
    Object.entries(clubData).filter(([key, _]) => !forbiddenKeys.includes(key))
  );

  Object.keys(updates).forEach((key) => (club[key] = updates[key]));

  club = await club.save();

  return club;
}

async function deleteClub({ clubId, userId, userRole }) {
  const players = await playersService.getPlayersForClub(clubId);

  if (players.length > 0) {
    throw new ApiError('You cannot delete a club with players linked', httpStatus.BAD_REQUEST);
  }

  const club = await getClubById(clubId);

  if (!club) {
    throw new ApiError(`Club not found with id of ${clubId}`, httpStatus.NOT_FOUND);
  }

  const isAuthorized = userRole === 'admin' || club.authorizedUsers.includes(userId);

  if (!isAuthorized) {
    throw new ApiError(
      `You don't have access to the club with the id of ${clubId}`,
      httpStatus.UNAUTHORIZED
    );
  }

  await club.remove();
}

async function grantAccess({ clubId, userId }) {
  const user = await usersService.getUserById(userId);

  if (!user) {
    throw new ApiError(`User not found with the id of ${userId}`, httpStatus.NOT_FOUND);
  }

  const club = await getClubById(clubId);

  if (!club) {
    throw new ApiError(`Club not found with the id of ${clubId}`, httpStatus.NOT_FOUND);
  }

  if (club.authorizedUsers.includes(userId)) {
    throw new ApiError(
      `User with the id of ${userId} already has access to the club with the id of ${clubId}`,
      httpStatus.BAD_REQUEST
    );
  }

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
  getClubById,
};
