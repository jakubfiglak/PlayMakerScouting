const asyncHandler = require('express-async-handler');
const isAdmin = require('../utils/isAdmin');
const dbService = require('../services/db.service');

const grantAccessToAPlayer = asyncHandler(async (req, res, next) => {
  if (isAdmin(req.user.role)) {
    return next();
  }
  const player = await dbService.getPlayerById(req.order.player._id);

  if (player.authorizedUsers.includes(req.user._id)) {
    return next();
  }

  player.authorizedUsers.push(req.user._id);
  await player.save();
  next();
});

const grantAccessToAClub = asyncHandler(async (req, res, next) => {
  const clubId = req.order.player.club && req.order.player.club._id;

  if (isAdmin(req.user.role) || !clubId) {
    return next();
  }

  const club = await dbService.getClubById(clubId);

  if (club.authorizedUsers.includes(req.user._id)) {
    return next();
  }

  club.authorizedUsers.push(req.user._id);
  await club.save();
  next();
});

module.exports = { grantAccessToAPlayer, grantAccessToAClub };
