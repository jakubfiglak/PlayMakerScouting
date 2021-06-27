const asyncHandler = require('express-async-handler');
const accessControlListService = require('./accessControlLists.service');

const createAclOnUserRegister = asyncHandler(async (req, res, next) => {
  await accessControlListService.createAccessControlList({
    user: req.createdUser._id.toHexString(),
  });

  next();
});

module.exports = { createAclOnUserRegister };
