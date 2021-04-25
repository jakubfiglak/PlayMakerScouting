const calculateAvg = require('../utils/calculateAvg');

function calculateReportAvg(next) {
  const ratings = this.skills.filter((item) => item.score).map((skill) => skill.score);
  this.avgRating = (calculateAvg(...ratings) / this.maxRatingScore) * 100;
  next();
}

module.exports = calculateReportAvg;
