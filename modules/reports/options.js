const options = {
  populate: [
    {
      path: 'player',
      select: 'firstName lastName position',
      populate: { path: 'club', select: 'name division' },
    },
    {
      path: 'scout',
      select: 'firstName lastName',
    },
    {
      path: 'order',
      select: 'createdAt orderNo docNumber',
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
};

module.exports = options;
