const httpStatus = require('http-status');
const ApiError = require('./ApiError');

function checkIfAssetExists({ name, asset, assetId }) {
  if (!asset) {
    throw new ApiError(`${name} not found with the id of ${assetId}`, httpStatus.NOT_FOUND);
  }
}

module.exports = checkIfAssetExists;
