const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Team = require('./team.model');
const ApiError = require('../../utils/ApiError');
const setAsset = require('../../middleware/setAsset');
const usersService = require('../users/users.service');

const setTeam = setAsset({ name: 'team', model: Team });

const validateMembers = asyncHandler(async (req, res, next) => {
  const promiseArr = req.body.members.map((member) => usersService.getUserById(member));

  const members = await Promise.all(promiseArr);

  if (members.includes(null)) {
    return next(
      new ApiError('At least one of the members has not been found', httpStatus.NOT_FOUND)
    );
  }
});

module.exports = { setTeam, validateMembers };