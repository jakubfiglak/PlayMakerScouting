const clubsService = require('../clubs/clubs.service');
const playersService = require('../players/players.service');
const ordersService = require('../orders/orders.service');
const reportsService = require('../reports/reports.service');

async function getDashboardData(accessFilters) {
  const promiseArr = [
    clubsService.getClubsCount(accessFilters.clubs),
    playersService.getPlayersCount(accessFilters.players),
    reportsService.getHighestRatedReport(accessFilters.reports),
    reportsService.getLatestReport(accessFilters.reports),
    reportsService.getReportsCount(accessFilters.reports),
    ordersService.getLatestOrder(),
    ordersService.getOrdersCountByStatus({
      accessFilters: accessFilters.orders,
      status: 'accepted',
    }),
    ordersService.getOrdersCountByStatus({
      accessFilters: accessFilters.orders,
      status: 'closed',
    }),
  ];

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

  return {
    clubsCount,
    playersCount,
    highestRatedReport: highestRatedReport[0] || null,
    latestReport: latestReport[0] || null,
    reportsCount,
    latestOrder: latestOrder[0] || null,
    acceptedOrdersCount,
    closedOrdersCount,
  };
}

module.exports = { getDashboardData };
