function filterForbiddenUpdates(forbiddenFields) {
  return function (req, res, next) {
    const filtered = Object.fromEntries(
      Object.entries(req.body).filter(([key, _]) => !forbiddenFields.includes(key))
    );
    req.body = filtered;
    next();
  };
}

module.exports = filterForbiddenUpdates;
