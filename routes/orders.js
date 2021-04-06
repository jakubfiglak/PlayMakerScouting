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

const router = express.Router({ mergeParams: true });

router.post('/', [protect, authorize('admin')], createOrder);
router.get('/', [protect, authorize('admin', 'playmaker-scout')], getOrders);
router.get('/my', [protect, authorize('admin', 'playmaker-scout')], getMyOrders);
router.get('/mylist', [protect, authorize('admin', 'playmaker-scout')], getMyList);
router.get('/:id', [protect, authorize('admin', 'playmaker-scout')], getOrder);
router.get('/my/:playerId', [protect, authorize('admin', 'playmaker-scout')], getMyOrdersForPlayer);
router.post('/:id/accept', [protect, authorize('admin', 'playmaker-scout')], acceptOrder);
router.post('/:id/reject', [protect, authorize('admin', 'playmaker-scout')], rejectOrder);
router.post('/:id/close', [protect, authorize('admin')], closeOrder);
router.delete('/:id', [protect, authorize('admin')], deleteOrder);

module.exports = router;
