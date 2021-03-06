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
// @route GET /api/v1/orders/:orderId/reports
// @access Private
exports.getReports = asyncHandler(async (req, res) => {
  const { playerId, orderId } = req.params;

  if (playerId) {
    req.query.player = playerId;
  }

  if (orderId) {
    req.query.order = orderId;
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
// @access Private
exports.getReport = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.report,
  });
});

// @desc Update report
// @route PUT /api/v1/report/:id
// @access Private
exports.updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await reportsService.updateReport({ report: req.report, reqBody: req.body });

  res.status(httpStatus.OK).json({
    success: true,
    data: report,
    message: `Report with the id of ${id} successfully updated!`,
  });
});

// @desc Set report status
// @route PUT /api/v1/report/:id/set-status
// @access Private
exports.setReportStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const report = await reportsService.setReportStatus({ report: req.report, status });

  res.status(httpStatus.OK).json({
    success: true,
    data: report,
    message: `Report with the id of ${id} status changed to ${status}`,
  });
});

// @desc Delete report
// @route DELETE /api/v1/clubs/:id
// @access Private
exports.deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await reportsService.deleteReport(req.report);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Report with the id of ${id} successfully removed!`,
  });
});
