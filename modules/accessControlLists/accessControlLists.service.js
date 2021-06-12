const AccessControlList = require('./accessControlList.model');

function createAccessControlList(accessControlListData) {
  return AccessControlList.create(accessControlListData);
}

function getAllAccessControlLists() {
  return AccessControlList.find({});
}

function getAccessControlListForAnAsset({ assetType, assetId }) {
  return AccessControlList.findOne({ [assetType]: assetId });
}

module.exports = {
  createAccessControlList,
  getAllAccessControlLists,
  getAccessControlListForAnAsset,
};
