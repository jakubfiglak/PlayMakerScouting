const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const accessControlListsService = require('./accessControlLists.service');

const setAclByAssetData = asyncHandler(async (req, res, next) => {
  const acl = await accessControlListsService.getAccessControlListForAnAsset({
    assetType: req.body.targetAssetType,
    assetId: req.body.targetAssetId,
  });

  if (!acl) {
    return next(new ApiError('No ACL found with provided params', httpStatus.NOT_FOUND));
  }

  req.acl = acl;

  next();
});

module.exports = { setAclByAssetData };
