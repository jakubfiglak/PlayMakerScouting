module.exports = {
  async up(db) {
    await db.collection('accesscontrollists').updateMany({}, { $set: { matches: [], notes: [] } });
  },

  async down(db) {
    await db
      .collection('accesscontrollists')
      .updateMany({}, { $unset: { matches: null, notes: null } });
  },
};
