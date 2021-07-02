const options = {
  populate: [
    {
      path: 'player',
    },
    {
      path: 'scout',
      select: 'firstName lastName',
    },
    {
      path: 'order',
      select: 'createdAt orderNo docNumber',
    },
    {
      path: 'playerCurrentClub',
    },
  ],
  highestRatedSort: '-avgRating',
  latestSort: '-createdAt',
  forbiddenUpdates: [
    'player',
    'scout',
    'order',
    'match',
    'individualAvg',
    'teamplayAvg',
    'avgRating',
    'createdAt',
    'updatedAt',
  ],
  listSelect: 'player reportNo docNumber createdAt',
  listPopulate: 'player',
};

module.exports = options;
