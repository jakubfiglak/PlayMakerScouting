module.exports = {
  async up(db) {
    const date = new Date();
    const dateISOString = date.toISOString();

    await db.collection('reports').updateMany({}, { $set: { 'match.date': dateISOString } });
  },

  async down(db) {
    await db.collection('reports').updateMany({}, { $unset: { 'match.date': '' } });
  },
};
