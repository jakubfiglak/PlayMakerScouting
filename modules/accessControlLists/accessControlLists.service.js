const AccessControlList = require('./accessControlList.model');
const isAdmin = require('../../utils/isAdmin');

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

  teamAcl.players = getUniqueIdsFromAclProps('players');
  teamAcl.clubs = getUniqueIdsFromAclProps('clubs');
  teamAcl.reports = getUniqueIdsFromAclProps('reports');
  teamAcl.reportBackgroundImages = getUniqueIdsFromAclProps('reportBackgroundImages');

  return teamAcl.save();
}

function grantAccessToTheAsset({ acl, assetType, assetId }) {
  if (!acl[`${assetType}s`].includes(assetId)) {
    acl[`${assetType}s`].push(assetId);
  }

  return acl.save();
}

async function grantAccessOnAssetCreation({ userRole, userAcl, teamAcl, assetType, assetId }) {
  if (isAdmin(userRole)) {
    return;
  }

  if (teamAcl) {
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

  await createAccessControlList({
    team: teamId,
    clubs: clubIds,
    players: playerIds,
    reports: reportIds,
    reportBackgroundImages: reportBackgroundImagesIds,
  });
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
};
