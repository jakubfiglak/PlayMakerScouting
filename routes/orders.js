const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
  closeOrder,
  rejectOrder,
  deleteOrder,
  getMyOrders,
  getMyOrdersForPlayer,
  getMyList,
} = require('../modules/orders/orders.controller');
const { protect, authorize } = require('../middleware/auth');
const prepareQuery = require('../middleware/prepareQuery');
const checkIfRelatedAssetsExist = require('../middleware/checkIfRelatedAssetsExist');
const Player = require('../models/player.model');
const ordersMiddleware = require('../modules/orders/orders.middleware');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  [
    protect,
    authorize('admin'),
    checkIfRelatedAssetsExist([{ fieldName: 'player', model: Player }]),
  ],
  createOrder
);
router.get(
  '/',
  [protect, authorize('admin', 'playmaker-scout'), prepareQuery, ordersMiddleware.setAccessFilters],
  getOrders
);
router.get('/my', [protect, authorize('admin', 'playmaker-scout'), prepareQuery], getMyOrders);
router.get('/mylist', [protect, authorize('admin', 'playmaker-scout')], getMyList);
router.get(
  '/:id',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    ordersMiddleware.setOrder,
    ordersMiddleware.canView,
  ],
  getOrder
);
router.get('/my/:playerId', [protect, authorize('admin', 'playmaker-scout')], getMyOrdersForPlayer);
router.post(
  '/:id/accept',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    ordersMiddleware.setOrder,
    ordersMiddleware.checkStatus(['open']),
    ordersMiddleware.grantAccessToAPlayer,
    ordersMiddleware.grantAccessToAClub,
  ],
  acceptOrder
);
router.post(
  '/:id/reject',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    ordersMiddleware.setOrder,
    ordersMiddleware.checkStatus(['accepted']),
    ordersMiddleware.canReject,
  ],
  rejectOrder
);
router.post(
  '/:id/close',
  [
    protect,
    authorize('admin'),
    ordersMiddleware.setOrder,
    ordersMiddleware.checkStatus(['accepted']),
  ],
  closeOrder
);
router.delete(
  '/:id',
  [protect, authorize('admin'), ordersMiddleware.setOrder, ordersMiddleware.checkStatus(['open'])],
  deleteOrder
);

module.exports = router;
