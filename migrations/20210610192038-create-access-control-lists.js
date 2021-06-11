// authorized users from clubs
// authorized users from players
// author from report

module.exports = {
  async up(db, client) {
    const users = await db
      .collection('users')
      .find({ role: { $ne: 'admin' } })
      .toArray();
    const operations = users.map(async (user) => {
      const clubs = await db.collection('clubs').find({ authorizedUsers: user._id }).toArray();
      const players = await db.collection('players').find({ authorizedUsers: user._id }).toArray();
      const reports = await db.collection('reports').find({ scout: user._id }).toArray();
      console.log('--------USER DATA---------');
      console.dir({ user, clubs, players, reports }, { depth: null });
    });

    await Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
