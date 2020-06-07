const asyncHandler = require('express-async-handler');
const Club = require('../models/Club');
const ErrorResponse = require('../utils/errorResponse');

exports.createClub = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  let club = await Club.findOne({ name });

  if (club) {
    return next(new ErrorResponse('Club already exists', 400));
  }

  club = await Club.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Successfully created new club!',
    data: club,
  });
});
