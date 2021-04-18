const Report = require('./report.model');
const resultsOptions = require('./options');

async function getReportsForPlayer(playerId) {
  const reports = await Report.find({ player: playerId });
  return reports;
}

function getHighestRatedReport(accessFilters) {
  return Report.find(accessFilters)
    .sort(resultsOptions.highestRatedSort)
    .limit(1)
    .populate(resultsOptions.populate);
}

function getLatestReport(accessFilters) {
  return Report.find(accessFilters)
    .sort(resultsOptions.latestSort)
    .limit(1)
    .populate(resultsOptions.populate);
}

function getReportsCount(accessFilters) {
  return Report.countDocuments(accessFilters);
}

async function createReport(reqBody) {
  let report = await Report.create(reqBody);
  report = await report.populate(resultsOptions.populate).execPopulate();
  return report;
}

async function getAllReports({ query, paginationOptions, accessFilters }) {
  const options = { ...paginationOptions, populate: resultsOptions.populate };
  const modifiedQuery = { ...query, ...accessFilters };
  const reports = await Report.paginate(modifiedQuery, options);
  return reports;
}

async function updateReport({ report, reqBody }) {
  const editedReport = report;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedReport[key] = reqBody[key];
    }
  });

  let modifiedReport = await editedReport.save();
  modifiedReport = await editedReport.populate(resultsOptions.populate).execPopulate();

  return modifiedReport;
}

async function deleteReport(report) {
  await report.remove();
}

module.exports = {
  getReportsForPlayer,
  getHighestRatedReport,
  getLatestReport,
  getReportsCount,
  createReport,
  getAllReports,
  updateReport,
  deleteReport,
};
