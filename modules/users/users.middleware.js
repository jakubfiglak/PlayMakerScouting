const httpStatus = require('http-status');
const User = require('./user.model');
const setAsset = require('../../middleware/setAsset');
const ApiError = require('../../utils/ApiError');

const setUser = setAsset({ name: 'userData', model: User });

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

module.exports = { setUser, checkRole };
