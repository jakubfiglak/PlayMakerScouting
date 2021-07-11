const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Team = require('./team.model');
const ApiError = require('../../utils/ApiError');
const setAsset = require('../../middleware/setAsset');
const usersService = require('../users/users.service');
const teamsService = require('./teams.service');

const setTeam = setAsset({ name: 'team', model: Team });

const checkIfAllMembersExist = asyncHandler(async (req, res, next) => {
  const promiseArr = req.body.members.map((member) => usersService.getUserById(member));

  const members = await Promise.all(promiseArr);

  if (members.includes(null)) {
    return next(
      new ApiError('At least one of the members has not been found', httpStatus.NOT_FOUND)
    );
  }

  next();
});

const checkMembersRoles = asyncHandler(async (req, res, next) => {
  const promiseArr = req.body.members.map((member) => usersService.getUserById(member));

  const members = await Promise.all(promiseArr);
  const roles = members.map((member) => member.role);
  if (roles.some((role) => role !== 'scout')) {
    return next(
      new ApiError(
        'At least one of the members is not of the role of scout',
        httpStatus.BAD_REQUEST
      )
    );
  }
  next();
});

const checkIfMembersBelongToAnotherTeam = asyncHandler(async (req, res, next) => {
  const promiseArr = req.body.members.map((member) => teamsService.getTeamByMemberId(member));

  const teams = await Promise.all(promiseArr);

  if (teams.some((team) => team !== null)) {
    return next(
      new ApiError('At least one of the members belongs to another team', httpStatus.BAD_REQUEST)
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

const checkMemberRole = asyncHandler(async (req, res, next) => {
  const member = await usersService.getUserById(req.body.memberId);
  if (member.role !== 'scout') {
    return next(
      new ApiError(
        `User with the id of ${req.body.memberId} is not of the role of scout`,
        httpStatus.BAD_REQUEST
      )
    );
  }
  next();
});

const checkIfMemberBelongsToAnotherTeam = asyncHandler(async (req, res, next) => {
  const team = await teamsService.getTeamByMemberId(req.body.memberId);
  if (team) {
    return next(
      new ApiError(
        `User with the id of ${req.body.memberId} belongs to another team`,
        httpStatus.BAD_REQUEST
      )
    );
  }
  next();
});

module.exports = {
  setTeam,
  checkIfAllMembersExist,
  checkIfMemberExists,
  checkIfMembersBelongToAnotherTeam,
  checkIfMemberBelongsToAnotherTeam,
  checkMembersRoles,
  checkMemberRole,
};
