const Report = require('../../models/report.model');

async function getReportsForPlayer(playerId) {
  const reports = await Report.find({ player: playerId });
  return reports;
}

module.exports = { getReportsForPlayer };
