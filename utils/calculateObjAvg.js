const calculateObjAvg = (object) => {
  const filtered = { ...object };

  Object.keys(filtered).forEach((key) => {
    if (filtered[key] === undefined || key.startsWith('$')) {
      delete filtered[key];
    }
  });

  const values = Object.values(filtered);

  return values.reduce((prev, curr) => prev + curr) / values.length;
};

module.exports = calculateObjAvg;
