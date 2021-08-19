const Match = require('./match.model');
const options = require('./options');

function getMatchById(id) {
  return Match.findById(id);
}

async function createMatch(matchData) {
  const match = await Match.create(matchData);
  return match;
}

async function getAllMatches({ query, paginationOptions, accessFilters }) {
  const clubQuery = query.club;
  const processedQuery = query;
  delete processedQuery.club;
  const modifiedQuery = clubQuery
    ? { $and: [processedQuery, clubQuery, accessFilters] }
    : { $and: [processedQuery, accessFilters] };
  const queryOptions = { ...paginationOptions, populate: ['notesCount'] };
  const matches = await Match.paginate(modifiedQuery, queryOptions);
  return matches;
}

async function getMatchesForClub(clubId) {
  const notes = await Match.find({ $or: [{ homeTeam: clubId }, { awayTeam: clubId }] });
  return notes;
}

async function getAllMatchesList(accessFilters) {
  const matches = await Match.find({ ...accessFilters })
    .select(options.listSelect)
    .sort(options.listSort);
  return matches;
}

async function updateMatch({ match, reqBody }) {
  const editedMatch = match;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedMatch[key] = reqBody[key];
    }
  });
  const modifiedMatch = await editedMatch.save();

  return modifiedMatch;
}

async function deleteMatch(match) {
  await match.remove();
}

module.exports = {
  getMatchById,
  createMatch,
  getAllMatches,
  getAllMatchesList,
  getMatchesForClub,
  updateMatch,
  deleteMatch,
};
