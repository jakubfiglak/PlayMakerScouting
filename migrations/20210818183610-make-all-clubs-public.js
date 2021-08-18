module.exports = {
  async up(db) {
    await db.collection('clubs').updateMany({}, { $set: { isPublic: true } });
  },

  async down(db) {
    await db.collection('clubs').updateMany({}, { $set: { isPublic: false } });
  },
};
