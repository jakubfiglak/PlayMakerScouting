const options = {
  populate: {
    player: 'firstName lastName',
    club: 'name division',
    user: 'firstName lastName',
  },
  listSelect: 'player playerCurrentClub text rating noteNo createdAt docNumber',
  forbiddenUpdates: ['playerCurrentClub', 'author'],
};

module.exports = options;
