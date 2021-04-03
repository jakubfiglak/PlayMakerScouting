const httpStatus = require('http-status');
const ApiError = require('./ApiError');

function checkDbRelations({ assetName, relatedAssetName, relatedDocuments }) {
  if (relatedDocuments.length > 0) {
    throw new ApiError(
      `You cannot delete a ${assetName} with existing relations to ${relatedAssetName} documents`,
      httpStatus.BAD_REQUEST
    );
  }
}

module.exports = checkDbRelations;
