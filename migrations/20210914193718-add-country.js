const collections = ['clubs', 'players'];

module.exports = {
  async up(db) {
    const operations = collections.map((collection) =>
      db.collection(collection).updateMany({}, { $set: { country: 'PL' } })
    );

    await Promise.all(operations);
  },

  async down(db) {
    const operations = collections.map((collection) =>
      db.collection(collection).updateMany({}, { $unset: { country: null } })
    );

    await Promise.all(operations);
  },
};
