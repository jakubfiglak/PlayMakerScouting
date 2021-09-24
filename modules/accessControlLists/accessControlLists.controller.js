const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const accessControlListsService = require('./accessControlLists.service');

// @desc Get all acess control lists
// @route GET /api/v1/access-control-lists
// @access Private (admin only)
exports.getAccessControlLists = asyncHandler(async (req, res) => {
  const reportTemplates = await accessControlListsService.getAllAccessControlLists();

  res.status(httpStatus.OK).json({
    success: true,
    data: reportTemplates,
    count: reportTemplates.length,
  });
});

// @desc Get single access control list
// @route GET /api/v1/access-control-lists/:assetType/:assetId
// @access Private (admin only)
exports.getAccessControlList = asyncHandler(async (req, res) => {
  const { assetType, assetId } = req.params;

  const accessControlList = await accessControlListsService.getAccessControlListForAnAsset({
    assetType,
    assetId,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: accessControlList,
  });
});

// @desc Grant access to the asset
// @route PATCH /api/v1/access-control-lists/grant-access
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res) => {
  const { targetAssetType, targetAssetId, assetToAddType, assetToAddId } = req.body;

  const updatedAcl = await accessControlListsService.grantAccessToTheAsset({
    acl: req.acl,
    assetType: assetToAddType,
    assetId: assetToAddId,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Successfully granted ${targetAssetType} id ${targetAssetId} with the access to ${assetToAddType} id ${assetToAddId}`,
    data: updatedAcl,
  });
});

// @desc Grant access to multiple assets
// @route PATCH /api/v1/access-control-lists/grant-access-multiple
// @access Private (admin only)
exports.grantAccessMultiple = asyncHandler(async (req, res) => {
  const { targetAssetType, targetAssetId, assetToAddType, assetToAddIds } = req.body;

  const updatedAcl = await accessControlListsService.grantAccessToMultipleAssets({
    acl: req.acl,
    assetType: assetToAddType,
    assetIds: assetToAddIds,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Successfully granted ${targetAssetType} id ${targetAssetId} with the access to ${assetToAddType} id ${assetToAddIds}`,
    data: updatedAcl,
  });
});
