const User = require('./user.model');
const options = require('./options');

function getUserById(id) {
  return User.findById(id).populate('team');
}
function getUserByConfirmationCode(confirmationCode) {
  return User.findOne({ confirmationCode });
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

async function changeRole({ user, role }) {
  const editedUser = user;
  editedUser.role = role;
  const modifiedUser = await editedUser.save();
  return modifiedUser;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByConfirmationCode,
  getUserById,
  getAllUsers,
  getAllUsersList,
  changeRole,
};
