const calculateObjAvg = (object) => {
  const filtered = { ...object };

  Object.keys(filtered).forEach((key) => {
    if (filtered[key] === undefined) delete filtered[key];
    if (key === '$init') delete filtered[key];
  });

  const values = Object.values(filtered);

  return values.reduce((prev, curr) => prev + curr) / values.length;
};

module.exports = calculateObjAvg;
