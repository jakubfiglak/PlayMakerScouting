const calculateAvg = require('../utils/calculateAvg');

function calculateReportAvg(next) {
  const ratings = this.skills.filter((item) => item.score).map((skill) => skill.score);
  const avg = calculateAvg(...ratings);
  this.avgRating = avg;
  this.percentageRating = (avg / this.maxRatingScore) * 100;
  next();
}

module.exports = calculateReportAvg;
