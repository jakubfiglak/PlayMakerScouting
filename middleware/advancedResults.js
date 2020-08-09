const sanitize = require('mongo-sanitize');

const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = sanitize({ ...req.query });

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

  // Find resource based on parsed query string
  let query = model.find(parsedQuery);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort by
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(parsedQuery);

  query = query.skip(startIndex).limit(limit);

  if (populate && populate.length > 0) {
    populate.forEach((pop) => {
      query = query.populate(pop);
    });
  }

  // Execute query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
    total,
  };

  next();
};

module.exports = advancedResults;
