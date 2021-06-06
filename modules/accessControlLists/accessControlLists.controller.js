const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const accessControlListsService = require('./accessControlLists.service');

// @desc Get all acess control lists
// @route GET /api/v1/access-control-lists
// @access Private (admin only)
exports.getAccessControlLists = asyncHandler(async (req, res) => {
  const reportTemplates = await accessControlListsService.getAllReportTemplates();

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
