const sanitize = require('mongo-sanitize');
const { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT } = require('../utils/defaults');

function prepareQuery(req, res, next) {
  const reqQuery = sanitize({ ...req.query });
  const { sort, limit, page } = req.query;

  const fieldsToRemove = ['select', 'sort', 'page', 'limit'];

  fieldsToRemove.forEach((field) => delete reqQuery[field]);

  // Create query string with mongoDB operators ($gt, $gte, etc.)
  const queryStr = JSON.stringify(reqQuery).replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  );
  const parsedQuery = JSON.parse(queryStr);

  // Add case insensitivity to regex patterns
  Object.keys(parsedQuery).forEach((key) => {
    if (parsedQuery[key].$regex) {
      parsedQuery[key].$options = 'i';
    }
  });

  const sortingOrder = sort?.startsWith('-') ? -1 : 1;
  const sortingString = sortingOrder === -1 ? sort?.substring(1) : sort;

  req.query = parsedQuery;
  req.paginationOptions = {
    sort: DEFAULT_SORT,
    limit: limit || DEFAULT_LIMIT,
    page: page || DEFAULT_PAGE,
  };

  if (sortingString) {
    req.paginationOptions.sort = { [sortingString]: sortingOrder, _id: 1 };
  }

  next();
}

module.exports = prepareQuery;
