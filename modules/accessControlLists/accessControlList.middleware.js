const asyncHandler = require('express-async-handler');
const accessControlListService = require('./accessControlLists.service');

const createAclOnUserRegister = asyncHandler(async (req, res, next) => {
  await accessControlListService.createAccessControlList({
    user: req.createdUser._id.toHexString(),
  });

  next();
});

const createAclOnTeamCreation = asyncHandler(async (req, res, next) => {
  const acls = await accessControlListService.getAccessControlListsForUsers(req.body.members);

  function getUniqueIdsFromAclProps(prop) {
    return [...new Set(acls.flatMap((acl) => acl[prop]).map((id) => id.toHexString()))];
  }

  const playerIds = getUniqueIdsFromAclProps('players');
  const clubIds = getUniqueIdsFromAclProps('clubs');
  const reportIds = getUniqueIdsFromAclProps('reports');
  const reportBackgroundImagesIds = getUniqueIdsFromAclProps('reportBackgroundImages');

  await accessControlListService.createAccessControlList({
    team: req.createdTeam._id,
    clubs: clubIds,
    players: playerIds,
    reports: reportIds,
    reportBackgroundImages: reportBackgroundImagesIds,
  });
  next();
});

module.exports = { createAclOnUserRegister, createAclOnTeamCreation };
