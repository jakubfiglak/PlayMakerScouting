const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Team = require('./team.model');
const ApiError = require('../../utils/ApiError');
const setAsset = require('../../middleware/setAsset');
const usersService = require('../users/users.service');
const teamsService = require('./teams.service');

const setTeam = setAsset({ name: 'team', model: Team });

const checkIfAllMembersExist = asyncHandler(async (req, res, next) => {
  // Check if members with provided ids exist in the database
  const promiseArr = req.body.members.map((member) => usersService.getUserById(member));

  const members = await Promise.all(promiseArr);

  if (members.includes(null)) {
    return next(
      new ApiError('At least one of the members has not been found', httpStatus.NOT_FOUND)
    );
  }

  next();
});

const checkIfMemberExists = asyncHandler(async (req, res, next) => {
  const member = await usersService.getUserById(req.body.memberId);
  if (!member) {
    return next(
      new ApiError(`User with the id of ${req.body.memberId} doesn't exist`, httpStatus.NOT_FOUND)
    );
  }
  next();
});

module.exports = { setTeam, checkIfAllMembersExist, checkIfMemberExists };
