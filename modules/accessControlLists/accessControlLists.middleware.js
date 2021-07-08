const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const accessControlListsService = require('./accessControlLists.service');
const playersService = require('../players/players.service');
const reportsService = require('../reports/reports.service');

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

const grantAccessToRelatedAssets = asyncHandler(async (req, res, next) => {
  if (req.body.assetToAddType === 'player') {
    const player = await playersService.getPlayerById(req.body.assetToAddId);

    if (player.club) {
      await accessControlListsService.grantAccessToTheAsset({
        acl: req.acl,
        assetType: 'club',
        assetId: player.club,
      });
    }

    return next();
  }

  if (req.body.assetToAddType === 'report') {
    const report = await reportsService.getReportById(req.body.assetToAddId);
    const player = await playersService.getPlayerById(report.player);

    await accessControlListsService.grantAccessToTheAsset({
      acl: req.acl,
      assetType: 'player',
      assetId: report.player,
    });

    if (player.club) {
      await accessControlListsService.grantAccessToTheAsset({
        acl: req.acl,
        assetType: 'club',
        assetId: player.club,
      });
    }
    return next();
  }

  next();
});

module.exports = { setAclByAssetData, grantAccessToRelatedAssets };
