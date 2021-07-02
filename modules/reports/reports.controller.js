const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const reportsService = require('./reports.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');

// @desc Create new report
// @route POST /api/v1/reports
// @access Private
exports.createReport = asyncHandler(async (req, res) => {
  const report = await reportsService.createReport(req.body);

  await accessControlListsService.grantAccessOnAssetCreation({
    userRole: req.user.role,
    userAcl: req.userAcl,
    teamAcl: req.teamAcl,
    assetType: 'report',
    assetId: report._id,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new report!',
    data: report,
  });
});

// @desc Get all reports
// @route GET /api/v1/reports
// @route GET /api/v1/players/:playerId/reports
// @access Private
exports.getReports = asyncHandler(async (req, res) => {
  const { playerId } = req.params;

  if (playerId) {
    req.query.player = playerId;
  }

  const { query, paginationOptions, accessFilters } = req;

  const reports = await reportsService.getAllReports({
    query,
    paginationOptions,
    accessFilters,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: reports,
  });
});

// @desc Get all reports list
// @route GET /api/v1/reports/list
// @access Private (admin only)
exports.getReportsList = asyncHandler(async (req, res) => {
  const reports = await reportsService.getAllReportsList();

  return res.status(httpStatus.OK).json({
    success: true,
    data: reports,
  });
});

// @desc Get single report
// @route GET /api/v1/reports/:id
// @access Private (author or admin only)
exports.getReport = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.report,
  });
});

// @desc Update report
// @route PUT /api/v1/report/:id
// @access Private (author or admin only)
exports.updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await reportsService.updateReport({ report: req.report, reqBody: req.body });

  res.status(httpStatus.OK).json({
    success: true,
    data: report,
    message: `Report with the id of ${id} successfully updated!`,
  });
});

// @desc Delete report
// @route DELETE /api/v1/clubs/:id
// @access Private (author or admin only)
exports.deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await reportsService.deleteReport(req.report);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Report with the id of ${id} successfully removed!`,
  });
});
