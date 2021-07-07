module.exports = {
  async up(db) {
    const reports = await db.collection('reports').find().toArray();

    const operations = reports.map((report) => {
      const avgRating = (report.maxRatingScore * report.avgRating) / 100;

      return db.collection('reports').updateOne(
        { _id: report._id },
        {
          $set: {
            avgRating,
            percentageRating: report.avgRating,
          },
        }
      );
    });

    await Promise.all(operations);
  },
};
