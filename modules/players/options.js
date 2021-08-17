const options = {
  populate: { path: 'club', select: 'name division' },
  listSelect: 'firstName lastName position isPublic',
  listSort: 'lastName',
  forbiddenUpdates: ['authorizedUsers', 'createdAt', 'updatedAt'],
};

module.exports = options;
