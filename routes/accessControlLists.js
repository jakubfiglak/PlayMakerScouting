const express = require('express');
const {
  getAccessControlLists,
  getAccessControlList,
  grantAccess,
  grantAccessMultiple,
} = require('../modules/accessControlLists/accessControlLists.controller');
const {
  setAclByAssetData,
  grantAccessToRelatedAssets,
} = require('../modules/accessControlLists/accessControlLists.middleware');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect, authorize('admin')], getAccessControlLists);
router.get('/:assetType/:assetId', [protect, authorize('admin')], getAccessControlList);
router.patch(
  '/grant-access',
  [protect, authorize('admin'), setAclByAssetData, grantAccessToRelatedAssets],
  grantAccess
);
router.patch(
  '/grant-access-multiple',
  [protect, authorize('admin'), setAclByAssetData],
  grantAccessMultiple
);

module.exports = router;
