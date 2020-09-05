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
    advancedResults(Order, [
      { path: 'player', select: ['firstName', 'lastName'] },
      { path: 'scout', select: ['name', 'surname'] },
    ]),
  ],
  getOrders
);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.get('/my/:playerId', protect, getMyOrdersForPlayer);
router.post('/:id/accept', protect, acceptOrder);
router.post('/:id/close', [protect, authorize('admin')], closeOrder);
router.delete('/:id', [protect, authorize('admin')], deleteOrder);

module.exports = router;
