const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc Create new report
// @route POST /api/v1/reports
// @access Private
exports.createReport = asyncHandler(async (req, res, next) => {
  req.body.scout = req.user._id;

  const playerId = req.body.player;
  const matchId = req.body.match;
  const orderId = req.body.order;

  const player = await Player.findById(playerId);
  const match = await Match.findById(matchId);
  let order;

  if (orderId) {
    order = await Order.findById(orderId);
  }

  if (!player) {
    return next(
      new ErrorResponse(`No player found with the id of ${playerId}`, 404)
    );
  }

  if (!match) {
    return next(
      new ErrorResponse(`No match found with the id of ${matchId}`, 404)
    );
  }

  if (orderId && !order) {
    return next(
      new ErrorResponse(`No order found with the id of ${orderId}`, 404)
    );
  }

  const report = await Report.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Successfully created new report!',
    data: report,
  });
});

// @desc Get all reports
// @route GET /api/v1/reports
// @route GET /api/v1/players/:playerId/reports
// @access Private (admin only)
exports.getReports = asyncHandler(async (req, res) => {
  if (req.params.playerId) {
    const reports = await Report.find({
      player: req.params.playerId,
    }).sort('-createdAt');

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  }

  res.status(200).json(res.advancedResults);
});

// @desc Get users reports
// @route GET /api/v1/reports/my
// @access Private
exports.getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({
    scout: req.user._id,
  })
    .populate([
      {
        path: 'player',
        select: 'firstName lastName',
      },
      {
        path: 'match',
        populate: [
          { path: 'homeTeam', select: 'name' },
          { path: 'awayTeam', select: 'name' },
        ],
      },
    ])
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: reports.length,
    data: reports,
  });
});

// @desc Get single report
// @route GET /api/v1/reports/:id
// @access Private (author or admin only)
exports.getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const report = await Report.findById(id).populate([
    {
      path: 'player',
      select: 'firstName lastName',
    },
    {
      path: 'match',
      populate: [
        { path: 'homeTeam', select: 'name' },
        { path: 'awayTeam', select: 'name' },
      ],
    },
    {
      path: 'user',
      select: 'name surname',
    },
  ]);

  if (!report) {
    return next(new ErrorResponse(`No report found with the id of ${id}`, 404));
  }

  if (
    report.user._id.toString() !== req.user._id
    && req.user.role !== 'admin'
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

  const report = await Report.findById(id);

  if (!report) {
    return next(new ErrorResponse(`No report found with the id of ${id}`, 404));
  }

  if (report.user.toString() !== req.user._id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update report with the id of ${id}`,
        401
      )
    );
  }

  Object.keys(req.body).forEach((key) => (report[key] = req.body[key]));

  await report.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    data: report,
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
