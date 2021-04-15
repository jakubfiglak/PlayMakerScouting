const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

function checkIfRelatedAssetExist({ fieldName, model }) {
  return asyncHandler(async (req, res, next) => {
    const asset = await model.findById(req.body[fieldName]);
    if (!asset) {
      return next(
        new ApiError(
          `${fieldName} with the id of ${req.body[fieldName]} not found`,
          httpStatus.NOT_FOUND
        )
      );
    }

    next();
  });
}

module.exports = checkIfRelatedAssetExist;
