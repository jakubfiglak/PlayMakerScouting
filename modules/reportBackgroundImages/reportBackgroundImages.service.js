const ReportBackgroundImage = require('./reportBackgroundImage.model');

function getAllReportBackgroundImages(accessFilters) {
  return ReportBackgroundImage.find(accessFilters);
}

module.exports = {
  getAllReportBackgroundImages,
};
