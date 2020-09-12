const sanitize = require('mongo-sanitize');

const clearQuery = (query) => {
  const reqQuery = sanitize({ ...query });

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((field) => delete reqQuery[field]);

  return reqQuery;
};

module.exports = clearQuery;
