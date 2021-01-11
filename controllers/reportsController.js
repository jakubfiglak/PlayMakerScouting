const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
const Player = require('../models/Player');
const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');
const prepareQuery = require('../utils/prepareQuery');
const getIndividualSkillsProps = require('../utils/getIndividualSkillsProps');

const populate = [
  {
    path: 'player',
    select: 'firstName lastName position',
    populate: { path: 'club', select: 'name' },
  },
  {
    path: 'scout',
    select: 'firstName lastName',
  },
];

// @desc Create new report
// @route POST /api/v1/reports
// @access Private
exports.createReport = asyncHandler(async (req, res, next) => {
  req.body.scout = req.user._id;

  const orderId = req.body.order;

  let order;

  if (orderId) {
    order = await Order.findById(orderId);
  } else {
    req.body.order = undefined;
  }

  // If player is not provided and the report is generated based on the order,
  // assign player ID from the order to req.body
  if (!req.body.player && order) {
    req.body.player = order.player;
  }

  const playerId = req.body.player;
  const player = await Player.findById(playerId);

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${playerId}`, 404)
    );
  }

  if (orderId && !order) {
    return next(
      new ErrorResponse(`No order found with the id of ${orderId}`, 404)
    );
  }

  if (orderId && order.status === 'open') {
    return next(
      new ErrorResponse(
        'You have to accept the order before creating a report attached to that order'
      )
    );
  }

  if (orderId && order.status === 'closed') {
    return next(
      new ErrorResponse(
        'You cannot create a report attached to an order that has already been closed'
      )
    );
  }

  req.body.individualSkills = getIndividualSkillsProps(
    req.body.individualSkills,
    player.position
  );

  let report = await Report.create(req.body);

  report = await report.populate(populate).execPopulate();

  res.status(201).json({
    success: true,
    message: 'Successfully created new report!',
    data: report,
  });
});

// @desc Get all reports
// @route GET /api/v1/reports
// @route GET /api/v1/players/:playerId/reports
// @access Private
exports.getReports = asyncHandler(async (req, res) => {
  const { playerId } = req.params;

  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    populate,
  };

  const query = { ...reqQuery };

  // If club ID is provided in query params, return only reports associated with that player
  if (playerId) {
    query.player = playerId;
  }

  // If user is not and admin, return only reports created by this user
  if (req.user.role !== 'admin') {
    query.scout = req.user._id;
  }

  const reports = await Report.paginate(query, options);

  return res.status(200).json({
    success: true,
    data: reports,
  });
});

// @desc Get users reports
// @route GET /api/v1/reports/my
// @access Private
exports.getMyReports = asyncHandler(async (req, res) => {
  const reqQuery = prepareQuery(req.query);

  const options = {
    sort: req.query.sort || '_id',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    populate,
  };

  const query = {
    scout: req.user._id,
    ...reqQuery,
  };

  const reports = await Report.paginate(query, options);

  res.status(200).json({
    success: true,
    data: reports,
  });
});

// @desc Get single report
// @route GET /api/v1/reports/:id
// @access Private (author or admin only)
exports.getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const report = await Report.findById(id).populate(populate);

  if (!report) {
    return next(new ErrorResponse(`No report found with the id of ${id}`, 404));
  }

  if (
    report.scout._id.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to view report with the id of ${id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: report,
  });
});

// @desc Update report
// @route PUT /api/v1/report/:id
// @access Private (author or admin only)
exports.updateReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let report = await Report.findById(id);

  if (!report) {
    return next(new ErrorResponse(`No report found with the id of ${id}`, 404));
  }

  if (report.scout.toString() !== req.user._id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update report with the id of ${id}`,
        401
      )
    );
  }

  const player = await Player.findById(report.player);

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${report.player}`, 404)
    );
  }

  req.body.individualSkills = getIndividualSkillsProps(
    req.body.individualSkills,
    player.position
  );

  Object.keys(req.body).forEach((key) => (report[key] = req.body[key]));

  await report.save({ validateModifiedOnly: true });

  report = await report.populate(populate).execPopulate();

  res.status(200).json({
    success: true,
    data: report,
    message: `Report with the id of ${id} successfully updated!`,
  });
});

// @desc Delete report
// @route DELETE /api/v1/clubs/:id
// @access Private (author or admin only)
exports.deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const report = await Report.findById(id);

  if (!report) {
    return next(new ErrorResponse(`No report found with the id of ${id}`, 404));
  }

  if (report.scout.toString() !== req.user._id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to delete report with the id of ${id}`,
        401
      )
    );
  }

  await report.remove();

  res.status(200).json({
    success: true,
    message: `Report with the id of ${id} successfully removed!`,
  });
});
