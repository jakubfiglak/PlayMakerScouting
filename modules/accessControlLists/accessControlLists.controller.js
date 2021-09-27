const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const accessControlListsService = require('./accessControlLists.service');

// @desc Get all acess control lists
// @route GET /api/v1/access-control-lists
// @access Private (admin only)
exports.getAccessControlLists = asyncHandler(async (req, res) => {
  const accessControlLists = await accessControlListsService.getAllAccessControlLists();

  res.status(httpStatus.OK).json({
    success: true,
    data: accessControlLists,
    count: accessControlLists.length,
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

// @desc Grant access to multiple assets
// @route PATCH /api/v1/access-control-lists/grant-access
// @access Private (admin only)
exports.grantAccess = asyncHandler(async (req, res) => {
  const { clubs, players, matches, notes, reports } = req.body;

  const updatedAcl = await accessControlListsService.grantAccessToMultipleAssets({
    acl: req.acl,
    clubs,
    players,
    matches,
    notes,
    reports,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Access successfully granted!',
    data: updatedAcl,
  });
});
