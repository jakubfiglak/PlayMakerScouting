const collections = [
  'clubs',
  'matches',
  'notes',
  'players',
  'ratings',
  'reports',
  'reporttemplates',
];

module.exports = {
  async up(db) {
    const operations = collections.map((collection) =>
      db
        .collection(collection)
        .updateMany({}, { $set: { createdByUserWithRole: 'playmaker-scout' } })
    );

    await Promise.all(operations);
  },

  async down(db) {
    const operations = collections.map((collection) =>
      db.collection(collection).updateMany({}, { $unset: { createdByUserWithRole: null } })
    );

    await Promise.all(operations);
  },
};
