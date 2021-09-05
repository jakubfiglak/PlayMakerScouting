const options = {
  populate: [
    {
      path: 'player',
    },
    {
      path: 'author',
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
  highestRatedSort: '-percentageRating',
  latestSort: '-createdAt',
  forbiddenUpdates: [
    'player',
    'author',
    'order',
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
