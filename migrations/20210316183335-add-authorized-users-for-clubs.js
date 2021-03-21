module.exports = {
  async up(db) {
    const clubs = await db.collection('clubs').find({}).toArray();

    const clubsOperations = clubs.map(async (club) => {
      const users = await db
        .collection('users')
        .find({ myClubs: club._id })
        .toArray();

      const userIds = users.map((user) => user._id);

      await db
        .collection('clubs')
        .updateOne(
          { _id: club._id },
          { $set: { authorizedUsers: [...userIds] } }
        );
    });

    const usersOperation = db
      .collection('users')
      .updateMany({}, { $unset: { myClubs: null } });

    await Promise.all([...clubsOperations, usersOperation]);
  },

  async down(db) {
    const users = await db.collection('users').find({}).toArray();

    const usersOperations = users.map(async (user) => {
      const clubs = await db
        .collection('clubs')
        .find({ authorizedUsers: user._id })
        .toArray();

      const clubIds = clubs.map((club) => club._id);

      await db
        .collection('users')
        .updateOne({ _id: user._id }, { $set: { myClubs: [...clubIds] } });
    });

    const clubsOperation = db
      .collection('clubs')
      .updateMany({}, { $unset: { authorizedUsers: null } });

    await Promise.all([...usersOperations, clubsOperation]);
  },
};
