const jwt = require('jsonwebtoken');

async function verifyUser(user) {
  let editedUser = user;

  editedUser.status = 'active';
  editedUser.confirmationCode = undefined;

  editedUser = await editedUser.save();
  return editedUser;
}

async function login(user) {
  const token = user.getJwt();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return { user, token, expiresAt: decoded.exp };
}

async function updatePassword({ user, newPassword }) {
  const editedUser = user;

  editedUser.password = newPassword;
  editedUser.resetPasswordToken = undefined;
  editedUser.resetPasswordExpires = undefined;
  await editedUser.save({ validateModifiedOnly: true });

  const token = editedUser.getJwt();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return { token, expiresAt: decoded.exp };
}

async function updateDetails({ user, reqBody }) {
  const editedUser = user;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedUser[key] = reqBody[key];
    }
  });
  const modifiedUser = await editedUser.save();

  return modifiedUser;
}

module.exports = {
  verifyUser,
  login,
  updateDetails,
  updatePassword,
};
