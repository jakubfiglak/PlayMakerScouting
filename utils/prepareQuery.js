const sanitize = require('mongo-sanitize');

const prepareQuery = (query) => {
  const reqQuery = sanitize({ ...query });

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((field) => delete reqQuery[field]);

  // Create query string with mongoDB operators ($gt, $gte, etc.)
  const queryStr = JSON.stringify(reqQuery).replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  );
  const parsedQuery = JSON.parse(queryStr);

  // Add case insensitivity to regex pattern if regex provided in query string
  Object.keys(parsedQuery).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(parsedQuery[key], '$regex')) {
      parsedQuery[key].$options = 'i';
    }
  });

  return parsedQuery;
};

module.exports = prepareQuery;
