const Order = require('./order.model');
const getQueryOptions = require('../../utils/getQueryOptions');
const prepareQuery = require('../../utils/prepareQuery');
const resultsOptions = require('./options');

async function createOrder(orderData) {
  let order = await Order.create(orderData);
  order = await order.populate(resultsOptions.populatePlayer).execPopulate();

  return order;
}

async function getAllOrders({ reqQuery, accessFilters }) {
  const { sort, limit, page } = reqQuery;
  const options = {
    ...getQueryOptions({ sort, limit, page }),
    populate: [resultsOptions.populatePlayer, resultsOptions.populateScout],
  };
  const query = { ...prepareQuery(reqQuery), ...accessFilters };
  const orders = await Order.paginate(query, options);
  return orders;
}

async function getMyOrders({ reqQuery, userId }) {
  const { sort, limit, page } = reqQuery;
  const options = {
    ...getQueryOptions({ sort, limit, page }),
    populate: [resultsOptions.populatePlayer, resultsOptions.populateScout],
  };

  const query = { ...prepareQuery(reqQuery), scout: userId };

  const orders = await Order.paginate(query, options);
  return orders;
}

async function getMyAcceptedOrdersList(userId) {
  const orders = await Order.find({ scout: userId, status: 'accepted' })
    .select(resultsOptions.listSelect)
    .populate([resultsOptions.populatePlayer]);
  return orders;
}

async function getMyOrdersForAPlayer({ userId, playerId }) {
  const orders = await Order.find({
    scout: userId,
    player: playerId,
  });

  return orders;
}
async function acceptOrder({ order, userId }) {
  let editedOrder = order;

  editedOrder.status = 'accepted';
  editedOrder.scout = userId;
  editedOrder.acceptDate = Date.now();

  await editedOrder.save();
  editedOrder = await editedOrder
    .populate([resultsOptions.populatePlayer, resultsOptions.populateScout])
    .execPopulate();
  return editedOrder;
}

async function rejectAcceptedOrder(order) {
  let editedOrder = order;

  editedOrder.status = 'open';
  editedOrder.scout = undefined;
  editedOrder.acceptDate = undefined;

  await editedOrder.save();
  editedOrder = await editedOrder.populate([resultsOptions.populatePlayer]).execPopulate();
  return editedOrder;
}

async function closeOrder(order) {
  let editedOrder = order;

  editedOrder.status = 'closed';
  editedOrder.closeDate = Date.now();

  await editedOrder.save();

  editedOrder = await editedOrder
    .populate([resultsOptions.populatePlayer, resultsOptions.populateScout])
    .execPopulate();
  return editedOrder;
}

async function deleteOrder(order) {
  await order.remove();
}

module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getMyAcceptedOrdersList,
  getMyOrdersForAPlayer,
  acceptOrder,
  rejectAcceptedOrder,
  closeOrder,
  deleteOrder,
};
