module.exports = {
  async up(db) {
    const clubsOperations = db
      .collection('clubs')
      .updateMany({}, { $unset: { authorizedUsers: null } });

    const playersOperations = db
      .collection('players')
      .updateMany({}, { $unset: { authorizedUsers: null } });

    await Promise.all([clubsOperations, playersOperations]);
  },
};
