const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
const User = require('../models/user.model');
const Order = require('../models/Order');
const Player = require('../models/player.model');
const Club = require('../models/club.model');

const populateReports = [
  {
    path: 'player',
    select: 'firstName lastName position',
    populate: { path: 'club', select: 'name division' },
  },
  {
    path: 'scout',
    select: 'firstName lastName',
  },
];

const populateOrders = {
  path: 'player',
  select: 'firstName lastName position',
  populate: { path: 'club', select: 'name' },
};

const getHighestRatedReport = ({ userRole, userID }) => {
  const query = userRole === 'admin' ? {} : { scout: userID };

  return Report.find(query)
    .sort('-avgRating')
    .limit(1)
    .populate(populateReports);
};

const getLatestReport = ({ userRole, userID }) => {
  const query = userRole === 'admin' ? {} : { scout: userID };

  return Report.find(query)
    .sort('-createdAt')
    .limit(1)
    .populate(populateReports);
};

const getReportsCount = ({ userRole, userID }) => {
  const query = userRole === 'admin' ? {} : { scout: userID };

  return Report.countDocuments(query);
};

const getUser = (userID) => User.findById(userID).lean();

const getLatestOrder = () =>
  Order.find({
    status: 'open',
  })
    .sort('-createdAt')
    .limit(1)
    .populate(populateOrders);

const getAcceptedOrdersCount = ({ userRole, userID }) => {
  const query = userRole === 'admin' ? {} : { scout: userID };

  return Order.countDocuments({ ...query, status: 'accepted' });
};

const getClosedOrdersCount = ({ userRole, userID }) => {
  const query = userRole === 'admin' ? {} : { scout: userID };

  return Order.countDocuments({ ...query, status: 'closed' });
};

const getPlayersCount = () => Player.countDocuments();
const getClubsCount = () => Club.countDocuments();

// @desc Get dashboard data
// @route GET /api/v1/dashboard
// @access Private
exports.getDashboardData = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const userRole = req.user.role;

  const promiseArr = [
    getUser(userID),
    getHighestRatedReport({ userID, userRole }),
    getLatestReport({ userID, userRole }),
    getReportsCount({ userID, userRole }),
  ];

  if (userRole === 'scout') {
    const [
      user,
      highestRatedReport,
      latestReport,
      reportsCount,
    ] = await Promise.all(promiseArr);

    return res.status(200).json({
      success: true,
      data: {
        clubsCount: user.myClubs.length,
        playersCount: user.myPlayers.length,
        highestRatedReport: highestRatedReport[0] || null,
        latestReport: latestReport[0] || null,
        reportsCount,
        latestOrder: null,
        acceptedOrdersCount: null,
        closedOrdersCount: null,
      },
    });
  }

  if (userRole === 'playmaker-scout') {
    promiseArr.push(
      getLatestOrder(),
      getAcceptedOrdersCount({ userRole, userID }),
      getClosedOrdersCount({ userRole, userID })
    );

    const [
      user,
      highestRatedReport,
      latestReport,
      reportsCount,
      latestOrder,
      acceptedOrdersCount,
      closedOrdersCount,
    ] = await Promise.all(promiseArr);

    return res.status(200).json({
      success: true,
      data: {
        clubsCount: user.myClubs.length,
        playersCount: user.myPlayers.length,
        highestRatedReport: highestRatedReport[0] || null,
        latestReport: latestReport[0] || null,
        reportsCount,
        latestOrder: latestOrder[0] || null,
        acceptedOrdersCount,
        closedOrdersCount,
      },
    });
  }

  promiseArr.shift();
  promiseArr.unshift(getClubsCount(), getPlayersCount());
  promiseArr.push(
    getLatestOrder(),
    getAcceptedOrdersCount({ userRole, userID }),
    getClosedOrdersCount({ userRole, userID })
  );

  const [
    clubsCount,
    playersCount,
    highestRatedReport,
    latestReport,
    reportsCount,
    latestOrder,
    acceptedOrdersCount,
    closedOrdersCount,
  ] = await Promise.all(promiseArr);

  res.status(200).json({
    success: true,
    data: {
      clubsCount,
      playersCount,
      highestRatedReport: highestRatedReport[0] || null,
      latestReport: latestReport[0] || null,
      reportsCount,
      latestOrder: latestOrder[0] || null,
      acceptedOrdersCount,
      closedOrdersCount,
    },
  });
});
