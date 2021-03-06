const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ordersService = require('./orders.service');
const accessControlListsService = require('../accessControlLists/accessControlLists.service');

// @desc Create new order
// @route POST /api/v1/orders
// @access Private (admin only)
exports.createOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.createOrder(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new order!',
    data: order,
  });
});

// @desc Get all orders
// @route GET /api/v1/orders
// @route GET /api/v1/players/:playerId/orders
// @access Private (admin and playmaker-scout only)
exports.getOrders = asyncHandler(async (req, res) => {
  const { playerId } = req.params;

  if (playerId) {
    req.query.player = playerId;
  }

  const { query, paginationOptions, accessFilters } = req;

  const orders = await ordersService.getAllOrders({
    query,
    paginationOptions,
    accessFilters,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: orders,
  });
});

// @desc Get my orders
// @route GET /api/v1/orders/my
// @access Private (admin and playmaker-scout only)
exports.getMyOrders = asyncHandler(async (req, res) => {
  const { query, paginationOptions } = req;

  const orders = await ordersService.getMyOrders({
    query,
    paginationOptions,
    userId: req.user._id,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: orders,
  });
});

// @desc Get my orders list with the status of "accepted"
// @route GET /api/v1/orders/mylist
// @access Private (admin and playmaker-scout-only)
exports.getMyList = asyncHandler(async (req, res) => {
  const orders = await ordersService.getMyAcceptedOrdersList(req.user._id);

  res.status(httpStatus.OK).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// @desc Get my orders for a specific player
// @route GET /api/v1/orders/my/:playerId
// @access Private (admin and playmaker-scout only)
exports.getMyOrdersForPlayer = asyncHandler(async (req, res) => {
  const orders = await ordersService.getMyOrdersForAPlayer({
    userId: req.user._id,
    playerId: req.params.playerId,
  });

  res.status(httpStatus.OK).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// @desc Get single order
// @route GET /api/v1/orders/:id
// @access Private (admin and playmaker-scout only)
exports.getOrder = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.order,
  });
});

// @desc Accept order
// @route POST /api/v1/orders/:id/accept
// @access Private (admin and playmaker-scout only)
exports.acceptOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await ordersService.acceptOrder({
    order: req.order,
    userId: req.user._id,
  });

  await accessControlListsService.grantAccessOnOrderAcceptance({
    userRole: req.user.role,
    userAcl: req.userAcl,
    playerId: req.order.player._id,
    clubId: req.order.player?.club,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Order with the id of ${id} successfully accepted`,
    data: order,
  });
});

// @desc Reject order
// @route POST /api/v1/orders/:id/reject
// @access Private (admin and playmaker-scout only)
exports.rejectOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await ordersService.rejectAcceptedOrder(req.order);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Order with the id of ${id} successfully rejected`,
    data: order,
  });
});

// @desc Close order
// @route POST /api/v1/orders/:id/close
// @access Private (admin only)
exports.closeOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await ordersService.closeOrder(req.order);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Order with the id of ${id} successfully closed`,
    data: order,
  });
});

// @desc Delete order
// @route DELETE /api/v1/orders/:id
// @access Private (admin only)
exports.deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await ordersService.deleteOrder(req.order);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Order with the id of ${id} successfully removed!`,
    data: id,
  });
});
