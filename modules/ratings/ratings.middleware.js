const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const Rating = require('./rating.model');
const reportTemplatesService = require('../reportTemplates/reportTemplates.service');
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

const canBeDeleted = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const reportTemplates = await reportTemplatesService.getReportTemplatesByRating(id);

  if (reportTemplates.length > 0) {
    return next(
      new ApiError(
        'You cannot delete a rating with existing relations to reportTemplate documents',
        httpStatus.FORBIDDEN
      )
    );
  }

  next();
});

module.exports = { setRating, setAccessFilters, canAccess, canBeDeleted };
