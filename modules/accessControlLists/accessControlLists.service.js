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

async function mergeMembersAclIntoTeamsAcl({ teamId, memberAcl }) {
  const teamAcl = await getAccessControlListForAnAsset({ assetType: 'team', assetId: teamId });
  function getUniqueIdsFromAclProps(prop) {
    return [...new Set([...teamAcl[prop], ...memberAcl[prop]].map((id) => id.toHexString()))];
  }
  teamAcl.players = getUniqueIdsFromAclProps('players');
  teamAcl.clubs = getUniqueIdsFromAclProps('clubs');
  teamAcl.reports = getUniqueIdsFromAclProps('reports');
  teamAcl.reportBackgroundImages = getUniqueIdsFromAclProps('reportBackgroundImages');
  const editedAcl = await teamAcl.save();
  return editedAcl;
}

function grantAccessToTheAsset({ acl, assetType, assetId }) {
  acl[`${assetType}s`].push(assetId);
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

module.exports = {
  createAccessControlList,
  getAllAccessControlLists,
  getAccessControlListsForUsers,
  getAccessControlListForAnAsset,
  mergeMembersAclIntoTeamsAcl,
  grantAccessToTheAsset,
  grantAccessOnAssetCreation,
};
