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
} = require('../controllers/orders.controller');
const { protect, authorize } = require('../middleware/auth');
const checkIfRelatedAssetsExist = require('../middleware/checkIfRelatedAssetsExist');
const Player = require('../models/player.model');
const Order = require('../models/order.model');
const { setOrdersAccessFilters } = require('../middleware/setAccessFilters');
const { canViewOrder, canRejectOrder } = require('../middleware/checkPermissions');
const { setAsset } = require('../middleware/setAsset');
const checkOrderStatus = require('../middleware/checkOrderStatus');
const { grantAccessToAPlayer, grantAccessToAClub } = require('../middleware/grantAccess');

const router = express.Router({ mergeParams: true });

const populatePlayer = {
  path: 'player',
  select: ['firstName', 'lastName', 'club'],
  populate: { path: 'club', select: ['name', 'division'] },
};

const populateScout = { path: 'scout', select: ['firstName', 'lastName'] };

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
  [protect, authorize('admin', 'playmaker-scout'), setOrdersAccessFilters],
  getOrders
);
router.get('/my', [protect, authorize('admin', 'playmaker-scout')], getMyOrders);
router.get('/mylist', [protect, authorize('admin', 'playmaker-scout')], getMyList);
router.get(
  '/:id',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    setAsset({ name: 'order', model: Order, populate: [populatePlayer, populateScout] }),
    canViewOrder,
  ],
  getOrder
);
router.get('/my/:playerId', [protect, authorize('admin', 'playmaker-scout')], getMyOrdersForPlayer);
router.post(
  '/:id/accept',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    setAsset({ name: 'order', model: Order, populate: [populatePlayer, populateScout] }),
    checkOrderStatus(['open']),
    grantAccessToAPlayer,
    grantAccessToAClub,
  ],
  acceptOrder
);
router.post(
  '/:id/reject',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    setAsset({ name: 'order', model: Order, populate: [populatePlayer, populateScout] }),
    checkOrderStatus(['accepted']),
    canRejectOrder,
  ],
  rejectOrder
);
router.post(
  '/:id/close',
  [
    protect,
    authorize('admin'),
    setAsset({ name: 'order', model: Order, populate: [populatePlayer, populateScout] }),
    checkOrderStatus(['accepted']),
  ],
  closeOrder
);
router.delete(
  '/:id',
  [
    protect,
    authorize('admin'),
    setAsset({ name: 'order', model: Order, populate: [populatePlayer, populateScout] }),
    checkOrderStatus(['open']),
  ],
  deleteOrder
);

module.exports = router;
