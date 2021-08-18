const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const accessControlListsService = require('./accessControlLists.service');
const playersService = require('../players/players.service');
const reportsService = require('../reports/reports.service');
const matchesService = require('../matches/matches.service');
const notesService = require('../notes/notes.service');

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

async function grantAccessToPlayersClub({ acl, playerId }) {
  const player = await playersService.getPlayerById(playerId);

  if (player.club) {
    await accessControlListsService.grantAccessToTheAsset({
      acl,
      assetType: 'club',
      assetId: player.club,
    });
  }
}

async function grantAccessToReportsPlayer({ acl, reportId }) {
  const report = await reportsService.getReportById(reportId);

  await accessControlListsService.grantAccessToTheAsset({
    acl,
    assetType: 'player',
    assetId: report.player,
  });

  await grantAccessToPlayersClub({ acl, playerId: report.player });
}

async function grantAccessToMatchClubs({ acl, matchId }) {
  const match = await matchesService.getMatchById(matchId);

  await accessControlListsService.grantAccessToTheAsset({
    acl,
    assetType: 'club',
    assetId: match.homeTeam.id,
  });

  await accessControlListsService.grantAccessToTheAsset({
    acl,
    assetType: 'club',
    assetId: match.awayTeam.id,
  });
}

async function grantAccessToNoteRelatedAssets({ acl, noteId }) {
  const note = await notesService.getNoteById(noteId);

  if (note.player) {
    await accessControlListsService.grantAccessToTheAsset({
      acl,
      assetType: 'player',
      assetId: note.player.id,
    });
    await grantAccessToPlayersClub({ acl, playerId: note.player.id });
  }

  if (note.match) {
    await accessControlListsService.grantAccessToTheAsset({
      acl,
      assetType: 'match',
      assetId: note.match.id,
    });
    await grantAccessToMatchClubs({ acl, matchId: note.match });
  }
}

const grantAccessToRelatedAssets = asyncHandler(async (req, res, next) => {
  const { assetToAddType, assetToAddId } = req.body;

  switch (assetToAddType) {
    case 'player':
      await grantAccessToPlayersClub({ acl: req.acl, playerId: assetToAddId });
      return next();

    case 'report':
      await grantAccessToReportsPlayer({ acl: req.acl, reportId: assetToAddId });
      return next();

    case 'match':
      await grantAccessToMatchClubs({ acl: req.acl, matchId: assetToAddId });
      return next();

    case 'note':
      await grantAccessToNoteRelatedAssets({ acl: req.acl, noteId: assetToAddId });
      return next();

    default:
      next();
  }
});

module.exports = { setAclByAssetData, grantAccessToRelatedAssets };
