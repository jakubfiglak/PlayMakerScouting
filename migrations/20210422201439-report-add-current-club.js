module.exports = {
  async up(db) {
    const reports = await db
      .collection('reports')
      .aggregate([
        {
          $lookup: {
            from: 'players',
            localField: 'player',
            foreignField: '_id',
            as: 'playerData',
          },
        },
      ])
      .toArray();

    const operations = reports.map((report, idx) =>
      db
        .collection('reports')
        .updateOne(
          { _id: report._id },
          { $set: { playerCurrentClub: reports[idx].playerData[0].club } }
        )
    );
    // console.log(operations);

    await Promise.all(operations);
  },

  async down(db) {
    await db.collection('reports').updateMany({}, { $unset: { playerCurrentClub: null } });
  },
};
