const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const User = require('./user.model');
const setAsset = require('../../middleware/setAsset');
const ApiError = require('../../utils/ApiError');

const setUser = setAsset({ name: 'userData', model: User });

const setCurrentUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      new ApiError(`User not found with the id of ${req.user._id}`, httpStatus.NOT_FOUND)
    );
  }
  req.userData = user;
  next();
});

function checkRole(allowedRoles) {
  return (req, res, next) => {
    const { role } = req.userData;
    if (!allowedRoles.includes(role)) {
      return next(
        new ApiError(
          `You cannot perform this operation on a user with the role of ${role}`,
          httpStatus.BAD_REQUEST
        )
      );
    }

    next();
  };
}

module.exports = { setUser, checkRole, setCurrentUserData };
