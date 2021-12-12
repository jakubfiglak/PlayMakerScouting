const clubsService = require('../clubs/clubs.service');
const playersService = require('../players/players.service');
const ordersService = require('../orders/orders.service');
const reportsService = require('../reports/reports.service');
const notesService = require('../notes/notes.service');
const usersService = require('../users/users.service');

async function getLandingData() {
  const promiseArr = [
    reportsService.getTotalReportsCount({}),
    notesService.getTotalNotesCount({}),
    usersService.getPlaymakerScoutUsersCount(),
  ];

  const [totalReportsCount, totalNotesCount, totalUsersCount] = await Promise.all(promiseArr);

  return { totalReportsCount, totalNotesCount, totalUsersCount };
}

async function getDashboardData({ accessFilters, userId }) {
  const promiseArr = [
    clubsService.getClubsCount(accessFilters.clubs),
    playersService.getPlayersCount(accessFilters.players),
    reportsService.getHighestRatedReport(accessFilters.reports),
    reportsService.getLatestReport(accessFilters.reports),
    reportsService.getTotalReportsCount(accessFilters.reports),
    reportsService.getUsersReportsCount({ accessFilters: accessFilters.reports, userId }),
    notesService.getLatestNote(accessFilters.notes),
    notesService.getTotalNotesCount(accessFilters.notes),
    notesService.getUsersNotesCount({ accessFiltes: accessFilters.notes, userId }),
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
    totalReportsCount,
    userReportsCount,
    latestNote,
    totalNotesCount,
    userNotesCount,
    latestOrder,
    acceptedOrdersCount,
    closedOrdersCount,
  ] = await Promise.all(promiseArr);

  return {
    clubsCount,
    playersCount,
    highestRatedReport: highestRatedReport[0] || null,
    latestReport: latestReport[0] || null,
    totalReportsCount,
    userReportsCount,
    latestNote: latestNote[0] || null,
    totalNotesCount,
    userNotesCount,
    latestOrder: latestOrder[0] || null,
    acceptedOrdersCount,
    closedOrdersCount,
  };
}

module.exports = { getDashboardData, getLandingData };
