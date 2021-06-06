const ReportBackgroundImage = require('./reportBackgroundImage.model');

function getAllReportBackgroundImages() {
  return ReportBackgroundImage.find({});
}

module.exports = {
  getAllReportBackgroundImages,
};
