module.exports = {
  async up(db) {
    const reports = await db.collection('reports').find({}).toArray();
    const orders = await db.collection('orders').find({}).toArray();

    const reportsOperations = reports.map((report, idx) =>
      db
        .collection('reports')
        .updateOne({ _id: report._id }, { $set: { reportNo: idx + 1 } })
    );

    const ordersOperations = orders.map((order, idx) =>
      db
        .collection('orders')
        .updateOne({ _id: order._id }, { $set: { orderNo: idx + 1 } })
    );

    await Promise.all([...reportsOperations, ...ordersOperations]);
  },

  async down(db) {
    const reportsOperation = db
      .collection('reports')
      .updateMany({}, { $unset: { reportNo: null } });

    const ordersOperation = db
      .collection('orders')
      .updateMany({}, { $unset: { orderNo: null } });

    await Promise.all([reportsOperation, ordersOperation]);
  },
};
