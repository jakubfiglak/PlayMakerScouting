const mongoose = require('mongoose');

const author =
  process.env.NODE_ENV === 'production'
    ? mongoose.Types.ObjectId('6047f176c5d45231a400ef89')
    : mongoose.Types.ObjectId('5d7a514b5d2c12c7449be042');

module.exports = {
  async up(db) {
    const clubsOperations = db.collection('clubs').updateMany({}, { $set: { author } });

    const playersOperations = db.collection('players').updateMany({}, { $set: { author } });

    const ordersOperations = db.collection('orders').updateMany({}, { $set: { author } });

    await Promise.all([clubsOperations, playersOperations, ordersOperations]);
  },

  async down(db) {
    const clubsOperations = db.collection('clubs').updateMany({}, { $unset: { author: null } });

    const playersOperations = db.collection('players').updateMany({}, { $unset: { author: null } });

    const ordersOperations = db.collection('orders').updateMany({}, { $unset: { author: null } });

    await Promise.all([clubsOperations, playersOperations, ordersOperations]);
  },
};
