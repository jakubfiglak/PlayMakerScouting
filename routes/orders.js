const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
  deleteOrder,
} = require('../controllers/ordersController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', [protect, authorize('admin')], createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/:id/accept', protect, acceptOrder);
router.delete('/:id', [protect, authorize('admin')], deleteOrder);

module.exports = router;
