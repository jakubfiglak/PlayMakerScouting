const AccessControlList = require('./accessControlList.model');

async function createAccessControlList(accessControlListData) {
  const accessControlList = await AccessControlList.create(accessControlListData);
  return accessControlList;
}

function getAllAccessControlLists() {
  return AccessControlList.find({});
}

function getAccessControlListForAnAsset({ assetType, assetId }) {
  return AccessControlList.find({ [assetType]: assetId });
}

module.exports = {
  createAccessControlList,
  getAllAccessControlLists,
  getAccessControlListForAnAsset,
};
