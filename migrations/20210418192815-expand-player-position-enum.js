function setNewPosition({ db, id, position }) {
  return db.collection('players').updateOne({ _id: id }, { $set: { position } });
}

module.exports = {
  async up(db) {
    const players = await db
      .collection('players')
      .find({ position: { $in: ['FB', 'WM'] } })
      .toArray();
    const operations = players.map((player) => {
      switch (player.position) {
        case 'FB':
          return setNewPosition({ db, id: player._id, position: 'RB' });
        case 'WM':
          return setNewPosition({ db, id: player._id, position: 'RW' });
        default:
          return setNewPosition({ db, id: player._id, position: 'CM' });
      }
    });

    await Promise.all(operations);
  },

  async down(db) {
    const players = await db
      .collection('players')
      .find({ position: { $not: { $in: ['GK', 'CB', 'CM', 'F'] } } })
      .toArray();

    const operations = players.map((player) => {
      switch (player.position) {
        case 'LB':
        case 'RB':
        case 'LWB':
        case 'RWB':
          return setNewPosition({ db, id: player._id, position: 'FB' });
        case 'LW':
        case 'RW':
          return setNewPosition({ db, id: player._id, position: 'WM' });
        case 'DM':
        case 'CAM':
          return setNewPosition({ db, id: player._id, position: 'CM' });
        default:
          return setNewPosition({ db, id: player._id, position: 'CM' });
      }
    });

    await Promise.all(operations);
  },
};
