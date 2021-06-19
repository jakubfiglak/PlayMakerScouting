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

// @desc Update team
// @route PUT /api/v1/teams/:id
// @access Private (admin only)
exports.updateTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const team = await teamsService.updateTeam({ team: req.team, reqBody: req.body });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Team with the id of ${id} successfully updated`,
    data: team,
  });
});
