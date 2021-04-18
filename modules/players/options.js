const options = {
  populate: { path: 'club', select: 'name division' },
  listSelect: 'firstName lastName position',
  listSort: 'lastName',
  forbiddenUpdates: ['authorizedUsers', 'createdAt', 'updatedAt'],
};

module.exports = options;
