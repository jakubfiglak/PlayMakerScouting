const options = {
  populate: {
    player: 'firstName lastName yearOfBirth',
    club: 'name division',
    user: 'firstName lastName',
  },
  listSelect: 'player playerCurrentClub text rating noteNo createdAt docNumber shirtNo',
  forbiddenUpdates: ['playerCurrentClub', 'author'],
  latestSort: '-createdAt',
};

module.exports = options;
