const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const isAdmin = require('../utils/isAdmin');
const accessControlListsService = require('../modules/accessControlLists/accessControlLists.service');
const teamsService = require('../modules/teams/teams.service');
const ApiError = require('../utils/ApiError');

const setAcls = asyncHandler(async (req, res, next) => {
  // if user is an admin he doesn't need an acl
  if (isAdmin(req.user.role)) {
    req.teamAcl = {};
    req.userAcl = {};
    req.acl = {};
    return next();
  }

  // set users team ACL if he belongs to the team
  const team = await teamsService.getTeamByMemberId(req.user._id);

  if (team) {
    const teamAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });
    req.teamAcl = teamAcl;
    req.acl = teamAcl;
  } else {
    // if he doesn't belong to the team, leave the team ACL empty
    req.teamAcl = {};
  }
  // if user doesn't belong to any team, he uses his own acl
  const userAcl = await accessControlListsService.getAccessControlListForAnAsset({
    assetType: 'user',
    assetId: req.user._id,
  });

  if (!userAcl) {
    return next(new ApiError('Unable to set users Access Control List', httpStatus.BAD_REQUEST));
  }

  req.userAcl = userAcl;
  if (!team) {
    req.acl = userAcl;
  }

  next();
});

module.exports = setAcls;
