module.exports = {
  async up(db) {
    const reports = await db.collection('reports').find({}).toArray();

    const reportsOperations = reports.map((report) =>
      db
        .collection('reports')
        .updateOne({ _id: report._id }, { $set: { author: report.scout }, $unset: { scout: null } })
    );

    await Promise.all(reportsOperations);
  },

  async down(db) {
    const reports = await db.collection('reports').find({}).toArray();

    const reportsOperations = reports.map((report) =>
      db
        .collection('reports')
        .updateOne(
          { _id: report._id },
          { $set: { scout: report.author }, $unset: { author: null } }
        )
    );

    await Promise.all(reportsOperations);
  },
};
