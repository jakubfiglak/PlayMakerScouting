const options = {
  populate: {
    player: 'firstName lastName',
    club: 'name',
    user: 'firstName lastName',
  },
  listSelect: 'player playerCurrentClub text rating docNumber',
  forbiddenUpdates: ['player', 'playerCurrentClub', 'author'],
};

module.exports = options;
