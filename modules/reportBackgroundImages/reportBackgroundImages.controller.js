const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const reportBackgroundImagesService = require('./reportBackgroundImages.service');

// @desc Get all report background images
// @route GET /api/v1/report-background-images
// @access Private
exports.getReportBackgroundImages = asyncHandler(async (req, res) => {
  const reportTemplates = await reportBackgroundImagesService.getAllReportBackgroundImages(
    req.accessFilters
  );

  res.status(httpStatus.OK).json({
    success: true,
    data: reportTemplates,
    count: reportTemplates.length,
  });
});
