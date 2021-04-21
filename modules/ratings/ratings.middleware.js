const httpStatus = require('http-status');
const Rating = require('./rating.model');
const setAsset = require('../../middleware/setAsset');
const ApiError = require('../../utils/ApiError');
const isAdmin = require('../../utils/isAdmin');

const setRating = setAsset({ name: 'rating', model: Rating });

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { $or: [{ author: req.user._id }, { private: false }] };
  next();
}

function canAccess(req, res, next) {
  const { rating, user } = req;
  const isAuthor = rating.author.toString() === user._id;
  const isRatingPrivate = rating.private === true;

  const isPermitted = isAdmin(user.role) || isAuthor || !isRatingPrivate;

  if (!isPermitted) {
    return next(
      new ApiError("You don't have access to the rating you've requsted", httpStatus.FORBIDDEN)
    );
  }
  next();
}

function setAuthor(req, res, next) {
  req.body.author = req.user._id;
  next();
}

module.exports = { setRating, setAccessFilters, canAccess, setAuthor };
