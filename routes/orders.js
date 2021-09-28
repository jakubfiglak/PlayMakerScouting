const express = require('express');
const reportsRouter = require('./reports');
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
const checkIfRelatedAssetExist = require('../middleware/checkIfRelatedAssetExist');
const setAcls = require('../middleware/setAcls');
const Player = require('../modules/players/player.model');
const {
  setAccessFilters,
  setOrder,
  canView,
  checkStatus,
  canReject,
  canBeDeleted,
} = require('../modules/orders/orders.middleware');
const setAuthor = require('../middleware/setAuthor');

const router = express.Router({ mergeParams: true });

router.use('/:orderId/reports', protect, reportsRouter);

router.post(
  '/',
  [
    protect,
    authorize('admin'),
    checkIfRelatedAssetExist({ fieldName: 'player', model: Player }),
    setAuthor,
  ],
  createOrder
);
router.get(
  '/',
  [protect, authorize('admin', 'playmaker-scout'), prepareQuery, setAccessFilters],
  getOrders
);
router.get('/my', [protect, authorize('admin', 'playmaker-scout'), prepareQuery], getMyOrders);
router.get('/mylist', [protect, authorize('admin', 'playmaker-scout')], getMyList);
router.get('/:id', [protect, authorize('admin', 'playmaker-scout'), setOrder, canView], getOrder);
router.get('/my/:playerId', [protect, authorize('admin', 'playmaker-scout')], getMyOrdersForPlayer);
router.post(
  '/:id/accept',
  [protect, authorize('admin', 'playmaker-scout'), setAcls, setOrder, checkStatus(['open'])],
  acceptOrder
);
router.post(
  '/:id/reject',
  [protect, authorize('admin', 'playmaker-scout'), setOrder, checkStatus(['accepted']), canReject],
  rejectOrder
);
router.post(
  '/:id/close',
  [protect, authorize('admin'), setOrder, checkStatus(['accepted'])],
  closeOrder
);
router.delete(
  '/:id',
  [protect, authorize('admin'), setOrder, checkStatus(['open']), canBeDeleted],
  deleteOrder
);

module.exports = router;
