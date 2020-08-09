const calculateAvg = require('../utils/calculateAvg');

const getAvg = (object) => {
  const ratings = Object.entries(object)
    .map(([key, value]) => value.rating)
    .filter((el) => el !== undefined);

  return calculateAvg(...ratings);
};

function calculateReportAvg(next) {
  this.individualAvg = getAvg(this.individualSkills);
  this.teamplayAvg = getAvg(this.teamplaySkills);
  this.avgRating = calculateAvg(this.individualAvg, this.teamplayAvg);
  next();
}

module.exports = calculateReportAvg;
