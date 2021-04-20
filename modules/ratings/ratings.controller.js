const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ratingsService = require('./ratings.service');

// @desc Create new rating
// @route POST /api/v1/ratings
// @access Private
exports.createRating = asyncHandler(async (req, res) => {
  const rating = await ratingsService.createRating(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully created new rating',
    data: rating,
  });
});

// @desc Get all ratings
// @route GET /api/v1/ratings
// @access Private
exports.getRatings = asyncHandler(async (req, res) => {
  const { accessFilters } = req;
  const ratings = await ratingsService.getAllRatings(accessFilters);

  res.status(httpStatus.OK).json({
    success: true,
    data: ratings,
  });
});

// @desc Get single rating
// @route GET /api/v1/ratings/:id
// @access Private
exports.getRating = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    data: req.rating,
  });
});

// @desc Update rating details
// @route PUT /api/v1/ratings/:id
// @access Private
exports.updateRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const rating = await ratingsService.updateRating({
    rating: req.rating,
    reqBody: req.body,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: `Rating with the id of ${id} successfully updated!`,
    data: rating,
  });
});

// @desc Delete rating
// @route DELETE /api/v1/ratings/:id
// @access Private
exports.deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await ratingsService.deleteRating(req.rating);

  res.status(httpStatus.OK).json({
    success: true,
    message: `Rating with the id of ${id} successfully removed!`,
    data: id,
  });
});
