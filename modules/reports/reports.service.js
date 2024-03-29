const Report = require('./report.model');
const resultsOptions = require('./options');
const uniquifyArray = require('../../utils/uniquifyArray');

function getReportById(id) {
  return Report.findById(id);
}

async function getReportsForPlayer(playerId) {
  const reports = await Report.find({ player: playerId });
  return reports;
}

async function getReportsForClub(clubId) {
  const reports = await Report.find({ playerCurrentClub: clubId });
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

function getTotalReportsCount(accessFilters) {
  return Report.countDocuments(accessFilters);
}

function getUsersReportsCount({ accessFilters, userId }) {
  return Report.countDocuments({ ...accessFilters, author: userId });
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

async function getAllReportsList() {
  const reports = await Report.find()
    .select(resultsOptions.listSelect)
    .populate(resultsOptions.listPopulate);

  return reports;
}

async function updateReport({ report, reqBody }) {
  const editedReport = report;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedReport[key] = reqBody[key];
    }
  });

  const modifiedReport = await editedReport.save();

  return modifiedReport;
}

async function setReportStatus({ report, status }) {
  const editedReport = report;
  editedReport.status = status;
  const modifiedReport = await editedReport.save();
  return modifiedReport;
}

async function deleteReport(report) {
  await report.remove();
}

async function getMultipleReportsPlayersAndClubs(reportIds) {
  const reports = await Report.find({ _id: { $in: reportIds } });
  const playerIds = reports.map((report) => report.player);
  const clubIds = reports.map((report) => report.playerCurrentClub);
  return { players: uniquifyArray(playerIds), clubs: uniquifyArray(clubIds) };
}

module.exports = {
  getReportById,
  getReportsForPlayer,
  getReportsForClub,
  getHighestRatedReport,
  getLatestReport,
  getTotalReportsCount,
  getUsersReportsCount,
  createReport,
  getAllReports,
  getAllReportsList,
  updateReport,
  setReportStatus,
  deleteReport,
  getMultipleReportsPlayersAndClubs,
};
