const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// @param relations: { fieldName: string, model: Model }[]
function checkIfRelatedAssetsExist(relations) {
  return asyncHandler(async (req, res, next) => {
    relations.forEach(async (relation) => {
      const { model, fieldName } = relation;
      const asset = await model.findById(req.body[fieldName]);
      if (!asset) {
        return next(
          new ApiError(
            `${fieldName} with the id of ${req.body[fieldName]} not found`,
            httpStatus.NOT_FOUND
          )
        );
      }
    });

    next();
  });
}

module.exports = checkIfRelatedAssetsExist;
