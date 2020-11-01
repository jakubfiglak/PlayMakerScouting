const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Player = require('../models/Player');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const prepareQuery = require('../utils/prepareQuery');

// @desc Create new order
// @route POST /api/v1/orders
// @access Private (admin only)
exports.createOrder = asyncHandler(async (req, res, next) => {
  const playerId = req.body.player;

  const player = await Player.findById(playerId);

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${playerId}`, 404)
    );
  }

  let order = await Order.create(req.body);

  order = await order
    .populate({ path: 'player', select: 'firstName lastName' })
    .execPopulate();

  res.status(201).json({
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

  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '-createdAt',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
    populate: [
      { path: 'player', select: ['firstName', 'lastName'] },
      { path: 'scout', select: ['firstName', 'lastName'] },
      { path: 'reports', select: ['_id'] },
    ],
  };

  if (playerId) {
    const query = {
      player: playerId,
      ...reqQuery,
    };

    const orders = await Order.paginate(query, options);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  }

  const orders = await Order.paginate(reqQuery, options);

  return res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc Get my orders
// @route GET /api/v1/orders/my
// @access Private (admin and playmaker-scout only)
exports.getMyOrders = asyncHandler(async (req, res) => {
  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '-createdAt',
    limit: req.query.limit || 20,
    page: req.query.page || 1,
    populate: [
      { path: 'player', select: ['firstName', 'lastName'] },
      { path: 'scout', select: ['firstName', 'lastName'] },
      { path: 'reports', select: ['_id'] },
    ],
  };

  const query = {
    scout: req.user._id,
    ...reqQuery,
  };

  const orders = await Order.paginate(query, options);

  return res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc Get my orders for a specific player
// @route GET /api/v1/orders/my/:playerId
// @access Private (admin and playmaker-scout only)
exports.getMyOrdersForPlayer = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    scout: req.user._id,
    player: req.params.playerId,
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// @desc Get single order
// @route GET /api/v1/orders/:id
// @access Private (admin and playmaker-scout only)
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'player',
    select: 'firstName lastName club',
    populate: {
      path: 'club',
      select: 'name',
    },
  });

  if (!order) {
    return next(
      new ErrorResponse(`No order found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc Accept order
// @route POST /api/v1/orders/:id/accept
// @access Private (admin and playmaker-scout only)
exports.acceptOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let order = await Order.findById(id);

  if (!order) {
    return next(new ErrorResponse(`No order found with the id of ${id}`, 404));
  }

  if (order.status === 'accepted') {
    return next(
      new ErrorResponse(
        `Order with the id of ${id} has been already accepted by another user`,
        400
      )
    );
  }

  if (order.status === 'closed') {
    return next(
      new ErrorResponse(
        `Order with the id of ${id} has already been closed`,
        400
      )
    );
  }

  // Grant user with an access to a player when order is accepted
  // And add players club to users favorites
  if (req.user.role !== 'admin') {
    const user = await User.findById(req.user._id);
    const player = await Player.findById(order.player);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    if (!player) {
      return next(
        new ErrorResponse(`Player not found with id of ${order.player}`, 404)
      );
    }

    if (!user.myPlayers.includes(order.player)) {
      user.myPlayers.push(order.player);
      await user.save();
    }

    if (!user.myClubs.includes(player.club)) {
      user.myClubs.push(player.club);
      await user.save();
    }
  }

  order.status = 'accepted';
  order.scout = req.user._id;
  order.acceptDate = Date.now();

  await order.save();

  order = await order
    .populate([
      { path: 'player', select: 'firstName lastName' },
      { path: 'scout', select: 'firstName lastName' },
    ])
    .execPopulate();

  res.status(200).json({
    success: true,
    message: `Order with the id of ${id} successfully accepted`,
    data: order,
  });
});

// @desc Close order
// @route POST /api/v1/orders/:id/close
// @access Private (admin only)
exports.closeOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let order = await Order.findById(id);

  if (!order) {
    return next(new ErrorResponse(`No order found with the id of ${id}`, 404));
  }

  if (order.status === 'open') {
    return next(
      new ErrorResponse(
        `Order with the id of ${id} has not been accepted yet`,
        400
      )
    );
  }

  if (order.status === 'closed') {
    return next(
      new ErrorResponse(
        `Order with the id of ${id} has already been closed`,
        400
      )
    );
  }

  order.status = 'closed';
  order.closeDate = Date.now();

  await order.save();

  order = await order
    .populate([
      { path: 'player', select: 'firstName lastName' },
      { path: 'scout', select: 'firstName lastName' },
    ])
    .execPopulate();

  res.status(200).json({
    success: true,
    message: `Order with the id of ${id} successfully closed`,
    data: order,
  });
});

// @desc Delete order
// @route DELETE /api/v1/orders/:id
// @access Private (admin only)
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorResponse(`No order found with the id of ${id}`, 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: `Order with the id of ${id} successfully removed!`,
  });
});
