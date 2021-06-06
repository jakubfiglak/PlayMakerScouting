const express = require('express');
const {
  getAccessControlLists,
  getAccessControlList,
} = require('../modules/accessControlLists/accessControlLists.controller');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', [protect, authorize('admin')], getAccessControlLists);
router.get('/:assetType/:assetId', [protect, authorize('admin')], getAccessControlList);

module.exports = router;
