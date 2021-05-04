module.exports = {
  async up(db) {
    await db.collection('reports').updateMany({}, { $set: { status: 'in-prep' } });
  },

  async down(db) {
    await db.collection('reports').updateMany({}, { $unset: { status: null } });
  },
};
