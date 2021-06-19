const AccessControlList = require('./accessControlList.model');

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

module.exports = {
  createAccessControlList,
  getAllAccessControlLists,
  getAccessControlListsForUsers,
  getAccessControlListForAnAsset,
  mergeMembersAclIntoTeamsAcl,
};
