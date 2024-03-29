const User = require('./user.model');
const options = require('./options');

function getUserById(id) {
  return User.findById(id).populate('team');
}

function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
}

function getUserByResetPasswordToken(resetPasswordToken) {
  return User.findOne({ resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } });
}

function createUser(reqBody) {
  return User.create(reqBody);
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

async function getAllUsers({ query, paginationOptions }) {
  const users = await User.paginate(query, paginationOptions);
  return users;
}

async function getAllUsersList() {
  const users = await User.find().select(options.listSelect).populate(options.populate);
  return users;
}

function getTotalUsersCount() {
  return User.countDocuments();
}

function getPlaymakerScoutUsersCount() {
  return User.countDocuments({ role: 'playmaker-scout' });
}

async function changeRole({ user, role }) {
  const editedUser = user;
  editedUser.role = role;
  const modifiedUser = await editedUser.save();
  return modifiedUser;
}

async function goToTheMatch({ user, matchId }) {
  const editedUser = user;
  editedUser.match = matchId;
  const modifiedUser = await editedUser.save();
  return modifiedUser;
}

async function leaveTheMatch(user) {
  const editedUser = user;
  editedUser.match = null;
  const modifiedUser = await editedUser.save();
  return modifiedUser;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByConfirmationCode,
  getUserByResetPasswordToken,
  getUserById,
  getAllUsers,
  getAllUsersList,
  changeRole,
  goToTheMatch,
  leaveTheMatch,
  getTotalUsersCount,
  getPlaymakerScoutUsersCount,
};
