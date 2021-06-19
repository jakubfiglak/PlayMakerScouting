const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const teamsService = require('./teams.service');

// @desc Create new team
// @route POST /api/v1/teams
// @access Private (admin only)
exports.createTeam = asyncHandler(async (req, res, next) => {
  const team = await teamsService.createTeam(req.body);

  req.createdTeam = team;

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new team',
    data: team,
  });

  next();
});

// @desc Get all teams
// @route GET /api/v1/teams
// @access Private (admin only)
exports.getTeams = asyncHandler(async (req, res) => {
  const teams = await teamsService.getAllTeams();

  res.status(httpStatus.OK).json({
    success: true,
    data: teams,
    count: teams.length,
  });
});
// @desc Add member
// @route PATCH /api/v1/teams/:id/add-member
// @access Private (admin only)
exports.addMember = asyncHandler(async (req, res) => {
  const team = await teamsService.addMember({ team: req.team, memberId: req.body.memberId });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Member with the id of ${req.body.memberId} successfully added to the ${req.team.name} team`,
    data: team,
  });
});

// @desc Remove member
// @route PATCH /api/v1/teams/:id/add-member
// @access Private (admin only)
exports.removeMember = asyncHandler(async (req, res) => {
  const team = await teamsService.removeMember({ team: req.team, memberId: req.body.memberId });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Member with the id of ${req.body.memberId} successfully removed from the ${req.team.name} team`,
    data: team,
  });
});
