const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const dashboardService = require('./dashboard.service');

// @desc Get dashboard data
// @route GET /api/v1/dashboard
// @access Private
exports.getDashboardData = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardData(req.accessFilters);

  res.status(httpStatus.OK).json({
    success: true,
    data,
  });
});
