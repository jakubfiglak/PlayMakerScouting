const options = {
  populatePlayer: {
    path: 'player',
    select: ['firstName', 'lastName', 'club'],
    populate: { path: 'club', select: ['name', 'division'] },
  },
  populateScout: { path: 'scout', select: ['firstName', 'lastName'] },
  listSelect: 'player club orderNo createdAt docNumber',
};

module.exports = options;
