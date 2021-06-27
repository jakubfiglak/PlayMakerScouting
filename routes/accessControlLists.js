const express = require('express');
const {
  getAccessControlLists,
  getAccessControlList,
  grantAccess,
} = require('../modules/accessControlLists/accessControlLists.controller');
const {
  setAclByAssetData,
} = require('../modules/accessControlLists/accessControlLists.middleware');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect, authorize('admin')], getAccessControlLists);
router.get('/:assetType/:assetId', [protect, authorize('admin')], getAccessControlList);
router.patch('/grant-access', [protect, authorize('admin'), setAclByAssetData], grantAccess);

module.exports = router;
