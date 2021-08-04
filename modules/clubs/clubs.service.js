const Club = require('./club.model');
const Player = require('../players/player.model');
const Report = require('../reports/report.model.js');
const AccessControlList = require('../accessControlLists/accessControlList.model');

function getClubById(id) {
  return Club.findById(id);
}

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

function getClubsCount(accessFilters) {
  return Club.countDocuments(accessFilters);
}

async function mergeClubsDuplicates() {
  // Get all players grouped by LNP ID
  const results = await Club.aggregate()
    .lookup({ from: 'players', localField: '_id', foreignField: 'club', as: 'players' })
    .lookup({
      from: 'reports',
      localField: '_id',
      foreignField: 'playerCurrentClub',
      as: 'reports',
    })
    .lookup({
      from: 'accesscontrollists',
      let: { clubId: '$_id' },
      pipeline: [{ $match: { $expr: { $in: ['$$clubId', '$clubs'] } } }],
      as: 'acls',
    })
    .group({
      _id: '$lnpID',
      ids: { $push: '$$ROOT._id' },
      entities: { $push: '$$ROOT' },
    });

  // Filter out players with only one definition
  const filteredResults = results.filter((club) => club.entities.length !== 1);

  // Set the club field in related player documents to the first club entity ID
  const playersOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return entity.players.map((player) =>
          Player.updateOne({ _id: player._id }, { $set: { club: result.entities[0]._id } })
        );
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Set the playerCurrentClub field in related report documents to the first club entity ID
  const reportsOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return entity.reports.map((report) =>
          Report.updateOne(
            { _id: report._id },
            { $set: { playerCurrentClub: result.entities[0]._id } }
          )
        );
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Edit access control lists - for each access control list containing
  // the club to be removed, add the entity to be kept in the database
  const aclsPushOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return entity.acls.map((acl) =>
          AccessControlList.updateOne(
            { _id: acl._id },
            { $push: { clubs: result.entities[0]._id } }
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
          AccessControlList.updateOne({ _id: acl._id }, { $pull: { clubs: entity._id } })
        );
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  // Remove duplicate club entities
  const clubsOperations = filteredResults
    .map((result) =>
      result.entities.map((entity, idx) => {
        if (idx === 0) {
          return null;
        }
        return Club.deleteOne({ _id: entity._id });
      })
    )
    .flat(Infinity)
    .filter((operation) => operation);

  return Promise.all([
    ...playersOperations,
    ...reportsOperations,
    ...aclsPushOperations,
    ...aclsPullOperations,
    ...clubsOperations,
  ]);
}

module.exports = {
  createClub,
  getAllClubs,
  getAllClubsList,
  updateClub,
  deleteClub,
  getClubById,
  getClubsCount,
  mergeClubsDuplicates,
};
