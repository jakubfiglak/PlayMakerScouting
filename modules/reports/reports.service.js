const Report = require('./report.model');
const options = require('./options');

async function getReportsForPlayer(playerId) {
  const reports = await Report.find({ player: playerId });
  return reports;
}

function getHighestRatedReport(accessFilters) {
  return Report.find(accessFilters)
    .sort(options.highestRatedSort)
    .limit(1)
    .populate(options.populate);
}

function getLatestReport(accessFilters) {
  return Report.find(accessFilters).sort(options.latestSort).limit(1).populate(options.populate);
}

function getReportsCount(accessFilters) {
  return Report.countDocuments(accessFilters);
}

module.exports = { getReportsForPlayer, getHighestRatedReport, getLatestReport, getReportsCount };
