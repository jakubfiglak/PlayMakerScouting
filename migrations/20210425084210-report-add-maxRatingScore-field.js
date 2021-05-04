module.exports = {
  async up(db) {
    await db.collection('reports').updateMany({}, { $set: { maxRatingScore: 4 } });
  },

  async down(db) {
    await db.collection('reports').updateMany({}, { $unset: { maxRatingScore: null } });
  },
};
