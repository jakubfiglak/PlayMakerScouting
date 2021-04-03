function filterForbiddenUpdates({ updates, forbiddenFields }) {
  return Object.fromEntries(
    Object.entries(updates).filter(([key, _]) => !forbiddenFields.includes(key))
  );
}

function updateLocalAsset({ asset, updates }) {
  return Object.fromEntries(
    Object.entries(asset).map(([key, value]) => {
      if (updates[key]) {
        return [key, updates[key]];
      }
      return [key, value];
    })
  );
}

module.exports = { filterForbiddenUpdates, updateLocalAsset };
