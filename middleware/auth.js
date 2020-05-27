const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Route protection
exports.protect = (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer')) {
    [, token] = auth.split(' ');
  }

  if (!token) {
    return next(
      new ErrorResponse(
        'User not authorized to access this route. No token provided',
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await User.findById(decoded.id);
    req.user = decoded;
    next();
  } catch (err) {
    return next(
      new ErrorResponse(
        'User not authorized to access this route. Invalid token.',
        400
      )
    );
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  const { role } = req.user;

  if (!roles.includes(role)) {
    return next(
      new ErrorResponse(
        `User role ${role} is not authorized to access this route`,
        403
      )
    );
  }

  next();
};
