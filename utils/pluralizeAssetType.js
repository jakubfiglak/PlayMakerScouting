function pluralizeAssetType(assetType) {
  const esPlurals = ['match'];

  if (esPlurals.includes(assetType)) {
    return `${assetType}es`;
  }

  return `${assetType}s`;
}

module.exports = pluralizeAssetType;
