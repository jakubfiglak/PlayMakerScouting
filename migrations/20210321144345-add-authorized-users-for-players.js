module.exports = {
  async up(db) {
    const players = await db.collection('players').find({}).toArray();

    const playersOperations = players.map(async (player) => {
      const users = await db
        .collection('users')
        .find({ myPlayers: player._id })
        .toArray();

      const userIds = users.map((user) => user._id);

      await db
        .collection('players')
        .updateOne(
          { _id: player._id },
          { $set: { authorizedUsers: [...userIds] } }
        );
    });

    const usersOperation = db
      .collection('users')
      .updateMany({}, { $unset: { myPlayers: null } });

    await Promise.all([...playersOperations, usersOperation]);
  },

  async down(db) {
    const users = await db.collection('users').find({}).toArray();

    const usersOperations = users.map(async (user) => {
      const players = await db
        .collection('players')
        .find({ authorizedUsers: user._id })
        .toArray();

      const playerIds = players.map((player) => player._id);

      await db
        .collection('users')
        .updateOne({ _id: user._id }, { $set: { myPlayers: [...playerIds] } });
    });

    const playersOperations = db
      .collection('players')
      .updateMany({}, { $unset: { authorizedUsers: null } });

    await Promise.all([...usersOperations, playersOperations]);
  },
};
