const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
  closeOrder,
  deleteOrder,
  getMyOrders,
  getMyOrdersForPlayer,
} = require('../controllers/ordersController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Order = require('../models/Order');

const router = express.Router({ mergeParams: true });

router.post('/', [protect, authorize('admin')], createOrder);
router.get(
  '/',
  [
    protect,
    authorize('admin', 'playmaker-scout'),
    advancedResults(Order, [
      { path: 'player', select: ['firstName', 'lastName'] },
      { path: 'scout', select: ['name', 'surname'] },
      { path: 'reports', select: ['_id'] },
    ]),
  ],
  getOrders
);
router.get(
  '/my',
  [protect, authorize('admin', 'playmaker-scout')],
  getMyOrders
);
router.get('/:id', [protect, authorize('admin', 'playmaker-scout')], getOrder);
router.get(
  '/my/:playerId',
  [protect, authorize('admin', 'playmaker-scout')],
  getMyOrdersForPlayer
);
router.post(
  '/:id/accept',
  [protect, authorize('admin', 'playmaker-scout')],
  acceptOrder
);
router.post('/:id/close', [protect, authorize('admin')], closeOrder);
router.delete('/:id', [protect, authorize('admin')], deleteOrder);

module.exports = router;
