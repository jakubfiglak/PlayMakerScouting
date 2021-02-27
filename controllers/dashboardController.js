const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
const User = require('../models/User');
const Order = require('../models/Order');

const reportsPopulate = [
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

const ordersPopulate = {
  path: 'player',
  select: 'firstName lastName position',
  populate: { path: 'club', select: 'name' },
};

// @desc Get dashboard data
// @route GET /api/v1/dashboard
// @access Private
exports.getDashboardData = asyncHandler(async (req, res) => {
  const userPromise = User.findById(req.user._id).lean();
  const isPrivilegedUser = req.user.role !== 'scout';

  const highestRatedReportsPromise = await Report.find({
    scout: req.user._id,
  })
    .sort('-avgRating')
    .limit(1)
    .populate(reportsPopulate)

    .lean();

  const latestReportsPromise = await Report.find({
    scout: req.user._id,
  })
    .sort('-createdAt')
    .limit(1)
    .populate(reportsPopulate)
    .lean();

  const reportsCountPromise = await Report.countDocuments({
    scout: req.user._id,
  });

  const promiseArr = [
    userPromise,
    highestRatedReportsPromise,
    latestReportsPromise,
    reportsCountPromise,
  ];

  if (isPrivilegedUser) {
    const ordersPromise = Order.find({
      status: 'open',
    })
      .sort('-createdAt')
      .limit(1)
      .populate(ordersPopulate)
      .lean();

    const acceptedOrdersCountPromise = Order.countDocuments({
      scout: req.user._id,
      status: 'accepted',
    });

    const closedOrdersCountPromise = Order.countDocuments({
      scout: req.user._id,
      status: 'closed',
    });

    promiseArr.push(
      ordersPromise,
      acceptedOrdersCountPromise,
      closedOrdersCountPromise
    );
  }

  const [
    user,
    highestRatedReports,
    latestReports,
    reportsCount,
    ...ordersData
  ] = await Promise.all(promiseArr);

  res.status(200).json({
    success: true,
    data: {
      clubsCount: user.myClubs.length,
      playersCount: user.myPlayers.length,
      highestRatedReport: highestRatedReports[0] || null,
      latestReport: latestReports[0] || null,
      reportsCount,
      latestOrder: isPrivilegedUser ? ordersData[0][0] || null : null,
      acceptedOrdersCount: isPrivilegedUser ? ordersData[1] : null,
      closedOrdersCount: isPrivilegedUser ? ordersData[2] : null,
    },
  });
});
