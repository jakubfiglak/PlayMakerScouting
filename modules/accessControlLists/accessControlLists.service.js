const AccessControlList = require('./accessControlList.model');
const pluralizeAssetType = require('../../utils/pluralizeAssetType');
const playersService = require('../players/players.service');
const reportsService = require('../reports/reports.service');
const matchesService = require('../matches/matches.service');
const notesService = require('../notes/notes.service');
const isAdmin = require('../../utils/isAdmin');
const uniquifyArray = require('../../utils/uniquifyArray');
const mergeObjectsWithArrayValues = require('../../utils/mergeObjectsWithArrayValues');

function createAccessControlList(accessControlListData) {
  return AccessControlList.create(accessControlListData);
}

function getAllAccessControlLists() {
  return AccessControlList.find({});
}

function getAccessControlListsForUsers(users) {
  return AccessControlList.find({ user: { $in: users } });
}

function getAccessControlListForAnAsset({ assetType, assetId }) {
  return AccessControlList.findOne({ [assetType]: assetId });
}

async function mergeMembersAclIntoTeamsAcl({ memberId, teamId }) {
  const [memberAcl, teamAcl] = await Promise.all([
    getAccessControlListForAnAsset({ assetType: 'user', assetId: memberId }),
    getAccessControlListForAnAsset({ assetType: 'team', assetId: teamId }),
  ]);

  function getUniqueIdsFromAclProps(prop) {
    return [...new Set([...teamAcl[prop], ...memberAcl[prop]].map((id) => id.toHexString()))];
  }

  const aclFields = ['players', 'clubs', 'reports', 'reportBackgroundImages', 'matches', 'notes'];

  aclFields.forEach((field) => {
    teamAcl[field] = getUniqueIdsFromAclProps(field);
  });

  return teamAcl.save();
}

function grantAccessToTheAsset({ acl, assetType, assetId }) {
  const assetTypePlural = pluralizeAssetType(assetType);

  if (!acl[assetTypePlural].includes(assetId)) {
    acl[assetTypePlural].push(assetId);
  }

  return acl.save();
}

async function grantAccessOnAssetCreation({ userRole, userAcl, teamAcl, assetType, assetId }) {
  if (isAdmin(userRole)) {
    return;
  }

  const assetTypePlural = pluralizeAssetType(assetType);

  if (teamAcl[assetTypePlural]) {
    await grantAccessToTheAsset({
      acl: teamAcl,
      assetType,
      assetId,
    });
  }

  await grantAccessToTheAsset({
    acl: userAcl,
    assetType,
    assetId,
  });
}

async function grantAccessOnOrderAcceptance({ userRole, userAcl, playerId, clubId }) {
  if (isAdmin(userRole)) {
    return;
  }

  if (clubId) {
    await grantAccessToTheAsset({
      acl: userAcl,
      assetType: 'club',
      assetId: clubId,
    });
  }

  await grantAccessToTheAsset({
    acl: userAcl,
    assetType: 'player',
    assetId: playerId,
  });
}

async function createAclOnTeamCreation({ teamId, members }) {
  const acls = await getAccessControlListsForUsers(members);

  function getUniqueIdsFromAclProps(prop) {
    return [...new Set(acls.flatMap((acl) => acl[prop]).map((id) => id.toHexString()))];
  }

  const playerIds = getUniqueIdsFromAclProps('players');
  const clubIds = getUniqueIdsFromAclProps('clubs');
  const reportIds = getUniqueIdsFromAclProps('reports');
  const reportBackgroundImagesIds = getUniqueIdsFromAclProps('reportBackgroundImages');
  const matchIds = getUniqueIdsFromAclProps('matches');
  const noteIds = getUniqueIdsFromAclProps('notes');

  await createAccessControlList({
    team: teamId,
    clubs: clubIds,
    players: playerIds,
    reports: reportIds,
    reportBackgroundImages: reportBackgroundImagesIds,
    matches: matchIds,
    notes: noteIds,
  });
}

async function getPlayerRelatedAssets(playerIds) {
  const clubs = await playersService.getMultiplePlayersClubs(playerIds);
  return { clubs };
}

async function getReportRelatedAssets(reportIds) {
  const { players, clubs: reportClubs } = await reportsService.getMultipleReportsPlayersAndClubs(
    reportIds
  );

  const playersClubs = await playersService.getMultiplePlayersClubs(players);
  return { players, clubs: uniquifyArray([...reportClubs, ...playersClubs]) };
}

async function getMatchRelatedAssets(matchIds) {
  const clubs = await matchesService.getMultipleMatchesClubs(matchIds);
  return { clubs };
}

async function getNoteRelatedAssets(noteIds) {
  const {
    players,
    clubs: noteClubs,
    matches,
  } = await notesService.getMultipleNotesPlayersClubsAndMatches(noteIds);

  const playersClubs = await playersService.getMultiplePlayersClubs(players);
  const matchesClubs = await matchesService.getMultipleMatchesClubs(matches);

  return {
    players,
    matches,
    clubs: uniquifyArray([...noteClubs, ...playersClubs, ...matchesClubs]),
  };
}

async function grantAccessToMultipleAssets({ acl, clubs, players, matches, notes, reports }) {
  const results = await Promise.all([
    getPlayerRelatedAssets(players),
    getReportRelatedAssets(reports),
    getMatchRelatedAssets(matches),
    getNoteRelatedAssets(notes),
  ]);

  const updates = mergeObjectsWithArrayValues([
    { clubs, players, matches, notes, reports },
    ...results.map((result) => result),
  ]);

  Object.keys(updates).forEach((key) => {
    updates[key].forEach((id) => {
      if (!acl[key].includes(id)) {
        acl[key].push(id);
      }
    });
  });

  return acl.save();
}
module.exports = {
  createAccessControlList,
  getAllAccessControlLists,
  getAccessControlListsForUsers,
  getAccessControlListForAnAsset,
  mergeMembersAclIntoTeamsAcl,
  grantAccessToTheAsset,
  grantAccessOnAssetCreation,
  createAclOnTeamCreation,
  grantAccessOnOrderAcceptance,
  grantAccessToMultipleAssets,
};
