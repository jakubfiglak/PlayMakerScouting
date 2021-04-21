const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ReportTemplate = require('./reportTemplate.model');
const setAsset = require('../../middleware/setAsset');
const ApiError = require('../../utils/ApiError');
const isAdmin = require('../../utils/isAdmin');
const ratingsService = require('../ratings/ratings.service');

const setReportTemplate = setAsset({ name: 'reportTemplate', model: ReportTemplate });

function setAccessFilters(req, res, next) {
  if (isAdmin(req.user.role)) {
    req.accessFilters = {};
    return next();
  }
  req.accessFilters = { $or: [{ author: req.user._id }, { private: false }] };
  next();
}

function canAccess(req, res, next) {
  const { reportTemplate, user } = req;
  const isAuthor = reportTemplate.author.toString() === user._id;
  const isTemplatePrivate = reportTemplate.private === true;

  const isPermitted = isAdmin(user.role) || isAuthor || !isTemplatePrivate;

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

const validateRatings = asyncHandler(async (req, res, next) => {
  const promiseArr = req.body.ratings.map((rating) => ratingsService.getRatingById(rating));

  if (promiseArr.includes(undefined)) {
    return next(new ApiError('At least one of the ratings was not found', httpStatus.NOT_FOUND));
  }
  next();
});

module.exports = { setReportTemplate, setAccessFilters, canAccess, setAuthor, validateRatings };
