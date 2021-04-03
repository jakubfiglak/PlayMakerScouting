function filterForbiddenUpdates({ updates, forbiddenFields }) {
  return Object.fromEntries(
    Object.entries(updates).filter(([key, _]) => !forbiddenFields.includes(key))
  );
}

module.exports = filterForbiddenUpdates;
