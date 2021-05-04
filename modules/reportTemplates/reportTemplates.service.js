const ReportTemplate = require('./reportTemplate.model');

async function createReportTemplate(reportTemplateData) {
  const reportTemplate = await ReportTemplate.create(reportTemplateData);
  return reportTemplate;
}

async function getAllReportTemplates(accessFilters) {
  const reportTemplates = await ReportTemplate.find({ ...accessFilters });
  return reportTemplates;
}

function getReportTemplateById(id) {
  return ReportTemplate.findById(id);
}

async function updateReportTemplate({ reportTemplate, reqBody }) {
  const editedReportTemplate = reportTemplate;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedReportTemplate[key] = reqBody[key];
    }
  });

  const modifiedReportTemplate = await editedReportTemplate.save();

  return modifiedReportTemplate;
}

function deleteReportTemplate(reportTemplate) {
  return reportTemplate.remove();
}

module.exports = {
  createReportTemplate,
  getAllReportTemplates,
  getReportTemplateById,
  updateReportTemplate,
  deleteReportTemplate,
};
