// authorized users from clubs
// authorized users from players
// author from report

module.exports = {
  async up(db) {
    const users = await db
      .collection('users')
      .find({ role: { $ne: 'admin' } })
      .toArray();

    const operations = users.map(async (user) => {
      const clubs = await db.collection('clubs').find({ authorizedUsers: user._id }).toArray();
      const players = await db.collection('players').find({ authorizedUsers: user._id }).toArray();
      const reports = await db.collection('reports').find({ scout: user._id }).toArray();

      return {
        user: user._id,
        clubs: clubs.map((club) => club._id),
        players: players.map((player) => player._id),
        reports: reports.map((report) => report._id),
        reportBackgroundImages: [],
      };
    });

    const accessControlLists = await Promise.all(operations);
    await db.collection('accesscontrollists').insertMany(accessControlLists);
  },

  async down(db) {
    await db.collection('accesscontrollists').deleteMany();
  },
};
