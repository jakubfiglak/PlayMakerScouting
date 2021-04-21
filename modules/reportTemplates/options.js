const options = {
  forbiddenUpdates: ['author', 'createdAt', 'updatedAt'],
  populate: 'ratings',
  select: 'name category shortName score',
};

module.exports = options;
