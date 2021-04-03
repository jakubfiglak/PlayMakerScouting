const httpStatus = require('http-status');
const ApiError = require('./ApiError');

function checkIfUserHasAccessToTheAsset({ assetName, asset, assetId, userId }) {
  if (asset.authorizedUsers.includes(userId)) {
    throw new ApiError(
      `User with the id of ${userId} already has access to the ${assetName} with the id of ${assetId}`,
      httpStatus.BAD_REQUEST
    );
  }
}

module.exports = checkIfUserHasAccessToTheAsset;
