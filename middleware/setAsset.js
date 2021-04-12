const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

function setAsset({ name, model, populate }) {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const asset = await model.findById(id).populate(populate);
    if (!asset) {
      return next(new ApiError(`${name} not found with the id of ${id}`, httpStatus.NOT_FOUND));
    }
    req[name] = asset;
    next();
  });
}

module.exports = setAsset;
