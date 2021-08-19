const bcrypt = require('bcryptjs');
const User = require('../modules/users/user.model');
const Club = require('../modules/clubs/club.model');
const Player = require('../modules/players/player.model');
const Order = require('../modules/orders/order.model');
const Report = require('../modules/reports/report.model');
const Rating = require('../modules/ratings/rating.model');
const ReportTemplate = require('../modules/reportTemplates/reportTemplate.model');
const Team = require('../modules/teams/team.model');
const AccessControlList = require('../modules/accessControlLists/accessControlList.model');
const ReportBackgroundImage = require('../modules/reportBackgroundImages/reportBackgroundImage.model');
const Match = require('../modules/matches/match.model');
const Note = require('../modules/notes/note.model');
const { buildUser } = require('./utils');

const salt = bcrypt.genSaltSync(10);

const insertUsers = async (users) =>
  User.insertMany(
    users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }))
  );

const insertTestUser = async (overrides = {}) => {
  const userData = buildUser(overrides);
  const user = await User.create(userData);
  return { user, token: user.getJwt() };
};

const insertClubs = (clubs) => Club.insertMany(clubs);
const insertPlayers = (players) => Player.insertMany(players);
const insertOrders = (orders) => Order.insertMany(orders);
const insertReports = (reports) => Report.insertMany(reports);
const insertRatings = (ratings) => Rating.insertMany(ratings);
const insertReportTemplates = (reportTemplates) => ReportTemplate.insertMany(reportTemplates);
const insertTeams = (teams) => Team.insertMany(teams);
const insertAccessControlLists = (acls) => AccessControlList.insertMany(acls);
const insertReportBackgroundImages = (images) => ReportBackgroundImage.insertMany(images);
const insertMatches = (matches) => Match.insertMany(matches);
const insertNotes = (notes) => Note.insertMany(notes);

module.exports = {
  insertUsers,
  insertTestUser,
  insertClubs,
  insertPlayers,
  insertOrders,
  insertReports,
  insertRatings,
  insertReportTemplates,
  insertTeams,
  insertAccessControlLists,
  insertReportBackgroundImages,
  insertMatches,
  insertNotes,
};
