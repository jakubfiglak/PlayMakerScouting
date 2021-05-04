const calculateAvg = require('../utils/calculateAvg');

function calculateReportAvg(report) {
  const ratings = report.skills.filter((item) => item.score).map((skill) => skill.score);
  return (calculateAvg(...ratings) / report.maxRatingScore) * 100;
}

module.exports = {
  async up(db) {
    const reports = await db.collection('reports').find().toArray();

    const operations = reports.map((report) => {
      const avgRating = calculateReportAvg(report);
      return db.collection('reports').updateOne({ _id: report._id }, { $set: { avgRating } });
    });

    await Promise.all(operations);
  },
};
