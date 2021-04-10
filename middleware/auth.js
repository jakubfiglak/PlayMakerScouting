const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

// Route protection
exports.protect = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ApiError('User not authorized to access this route. No token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError('User not authorized to access this route. Invalid token.', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  const { role } = req.user;

  if (!roles.includes(role)) {
    return next(new ApiError(`User role ${role} is not authorized to access this route`, 403));
  }

  next();
};
