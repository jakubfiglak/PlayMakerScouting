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
  ],
  highestRatedSort: '-avgRating',
  latestSort: '-createdAt',
};

module.exports = options;
