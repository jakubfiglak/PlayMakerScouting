function mergeObjectWithArrayValues(input) {
  const result = {};

  input.forEach((el) => {
    Object.entries(el).forEach(([key, value]) => {
      if (result[key]) {
        result[key].push(...value);
      } else {
        result[key] = [...value];
      }
    });
  });

  return result;
}

module.exports = mergeObjectWithArrayValues;
