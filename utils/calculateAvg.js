const calculateAvg = (...args) =>
  args.reduce((prev, curr) => prev + curr) / args.length;

module.exports = calculateAvg;
