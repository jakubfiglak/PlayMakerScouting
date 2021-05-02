const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const reportTemplatesService = require('./reportTemplates.service');

// @desc Create new report template
// @route POST /api/v1/report-templates
// @access Private
exports.createReportTemplate = asyncHandler(async (req, res) => {
  const reportTemplate = await reportTemplatesService.createReportTemplate(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new report template',
    data: reportTemplate,
  });
});

// @desc Get all report templates
// @route GET /api/v1/report-templates
// @access Private
exports.getReportTemplates = asyncHandler(async (req, res) => {
  const { accessFilters } = req;
  const reportTemplates = await reportTemplatesService.getAllReportTemplates(accessFilters);

  res.status(httpStatus.OK).json({
    success: true,
    data: reportTemplates,
    count: reportTemplates.length,
  });
});

// @desc Get single report template
// @route GET /api/v1/report-templates/:id
// @access Private
exports.getReportTemplate = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.reportTemplate,
  });
});

// @desc Update report template details
// @route PUT /api/v1/report-templates/:id
// @access Private
exports.updateReportTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reportTemplate = await reportTemplatesService.updateReportTemplate({
    reportTemplate: req.reportTemplate,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Report template with the id of ${id} successfully updated!`,
    data: reportTemplate,
  });
});

// @desc Delete report template
// @route DELETE /api/v1/report-templates/:id
// @access Private
exports.deleteReportTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await reportTemplatesService.deleteReportTemplate(req.reportTemplate);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Report template with the id of ${id} successfully removed!`,
    data: id,
  });
});
