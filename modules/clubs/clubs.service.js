const Club = require('./club.model');

async function createClub(clubData) {
  const club = await Club.create(clubData);
  return club;
}

async function getAllClubs({ query, paginationOptions, accessFilters }) {
  const modifiedQuery = { ...query, ...accessFilters };
  const clubs = await Club.paginate(modifiedQuery, paginationOptions);
  return clubs;
}

async function getAllClubsList(accessFilters) {
  const clubs = await Club.find({ ...accessFilters })
    .select('name')
    .sort('name');
  return clubs;
}

async function updateClub({ club, reqBody }) {
  const editedClub = club;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedClub[key] = reqBody[key];
    }
  });
  const modifiedClub = await editedClub.save();

  return modifiedClub;
}

async function deleteClub(club) {
  await club.remove();
}

async function grantAccess({ club, userId }) {
  club.authorizedUsers.push(userId);
  await club.save();
}

module.exports = {
  createClub,
  getAllClubs,
  getAllClubsList,
  updateClub,
  deleteClub,
  grantAccess,
};
