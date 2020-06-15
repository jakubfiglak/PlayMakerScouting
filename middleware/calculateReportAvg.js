const calculateObjAvg = require('../utils/calculateObjAvg');
const calculateAvg = require('../utils/calculateAvg');

function calculateReportAvg(next) {
  this.mentalAverage = calculateObjAvg(this.mental);
  this.physicalAverage = calculateObjAvg(this.physical);
  this.footballSkillsAverage = calculateObjAvg(this.footballSkills);
  this.averageRating = calculateAvg(
    this.mentalAverage,
    this.physicalAverage,
    this.footballSkillsAverage
  );
  next();
}

module.exports = calculateReportAvg;
