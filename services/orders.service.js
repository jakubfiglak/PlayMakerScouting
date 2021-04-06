const httpStatus = require('http-status');
const checkIfAssetExists = require('../utils/checkIfAssetExists');
const dbService = require('./db.service');
const Order = require('../models/order.model');
const getQueryOptions = require('../utils/getQueryOptions');
const prepareQuery = require('../utils/prepareQuery');
const { checkOrderAuthorization } = require('../utils/checkAuthorization');
const checkOrderStatus = require('../utils/checkOrderStatus');
const isAdmin = require('../utils/isAdmin');
const ApiError = require('../utils/ApiError');

const populatePlayer = {
  path: 'player',
  select: ['firstName', 'lastName', 'club'],
  populate: { path: 'club', select: ['name', 'division'] },
};

const populateScout = { path: 'scout', select: ['firstName', 'lastName'] };
const listSelect = 'player club orderNo createdAt docNumber';

async function createOrder(orderData) {
  const playerId = orderData.player;
  const player = await dbService.getPlayerById(playerId);
  checkIfAssetExists({ name: 'player', assetId: playerId, asset: player });

  let order = await Order.create(orderData);
  order = await order.populate([populatePlayer, populateScout]).execPopulate();

  return order;
}

async function getAllOrders(reqQuery) {
  const { sort, limit, page } = reqQuery;
  const options = {
    ...getQueryOptions({ sort, limit, page }),
    populate: [populatePlayer, populateScout],
  };

  const query = prepareQuery(reqQuery);
  const orders = await Order.paginate(query, options);

  return orders;
}

async function getOrdersWithAuthorization({ reqQuery, userId }) {
  const { sort, limit, page } = reqQuery;
  const options = {
    ...getQueryOptions({ sort, limit, page }),
    populate: [populatePlayer, populateScout],
  };

  const query = prepareQuery(reqQuery);
  query.$or = [{ scout: userId }, { status: 'open' }];
  const orders = await Order.paginate(query, options);

  return orders;
}

async function getMyOrders({ reqQuery, userId }) {
  const { sort, limit, page } = reqQuery;
  const options = {
    ...getQueryOptions({ sort, limit, page }),
    populate: [populatePlayer, populateScout],
  };

  const query = prepareQuery(reqQuery);
  query.scout = userId;

  const orders = await Order.paginate(query, options);
  return orders;
}

async function getMyAcceptedOrdersList(userId) {
  const orders = await Order.find({ scout: userId, status: 'accepted' })
    .select(listSelect)
    .populate([populatePlayer]);
  return orders;
}

async function getMyOrdersForAPlayer({ userId, playerId }) {
  const orders = await Order.find({
    scout: userId,
    player: playerId,
  });

  return orders;
}

async function getOrder({ orderId, userId, userRole }) {
  const order = await dbService.getOrderById(orderId);
  checkIfAssetExists({ name: 'order', asset: order, assetId: orderId });
  checkOrderAuthorization({ userId, userRole, order });
  return order;
}

async function acceptOrder({ orderId, userId, userRole }) {
  let order = await dbService.getOrderById(orderId);
  checkIfAssetExists({ name: 'order', asset: order, assetId: orderId });
  checkOrderStatus({ status: order.status, allowedStatuses: ['open'] });

  if (!isAdmin(userRole)) {
    const player = await dbService.getPlayerById(order.player);
    checkIfAssetExists({ name: 'player', asset: player, assetId: order.player });
    if (!player.authorizedUsers.includes(userId)) {
      player.authorizedUsers.push(userId);
      await player.save();
    }

    if (player.club) {
      const club = await dbService.getClubById(player.club);
      checkIfAssetExists({ name: 'club', asset: club, assetId: player.club });
      if (!club.authorizedUsers.includes(userId)) {
        club.authorizedUsers.push(userId);
        await club.save();
      }
    }
  }

  order.status = 'accepted';
  order.scout = userId;
  order.acceptDate = Date.now();

  await order.save();
  order = await order.populate([populatePlayer, populateScout]).execPopulate();
  return order;
}

async function rejectAcceptedOrder({ orderId, userId }) {
  let order = await dbService.getOrderById(orderId);
  checkIfAssetExists({ name: 'order', asset: order, assetId: orderId });
  checkOrderStatus({ status: order.status, allowedStatuses: ['accepted'] });

  if (order.scout !== userId) {
    throw new ApiError(
      'You cannot reject an order you are not assigned to',
      httpStatus.BAD_REQUEST
    );
  }

  order.status = 'open';
  order.scout = undefined;
  order.acceptDate = undefined;

  await order.save();
  order = await order.populate([populatePlayer]).execPopulate();
  return order;
}

async function closeOrder(orderId) {
  let order = await dbService.getOrderById(orderId);
  checkIfAssetExists({ name: 'order', asset: order, assetId: orderId });
  checkOrderStatus({ status: order.status, allowedStatuses: ['accepted'] });

  order.status = 'closed';
  order.closeDate = Date.now();

  await order.save();

  order = await order.populate([populatePlayer, populateScout]).execPopulate();
  return order;
}

async function deleteOrder(orderId) {
  const order = await dbService.getOrderById(orderId);
  checkIfAssetExists({ name: 'order', asset: order, assetId: orderId });
  checkOrderStatus({ status: order.status, allowedStatuses: ['open'] });

  await order.remove();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersWithAuthorization,
  getMyOrders,
  getMyAcceptedOrdersList,
  getMyOrdersForAPlayer,
  getOrder,
  acceptOrder,
  rejectAcceptedOrder,
  closeOrder,
  deleteOrder,
};
