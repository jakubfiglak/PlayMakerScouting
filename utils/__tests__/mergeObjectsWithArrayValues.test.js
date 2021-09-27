const mergeObjectsWithArrayValues = require('../mergeObjectsWithArrayValues');

it('should correctly merge objects', () => {
  const obj1 = {
    key1: ['abc', 'def'],
    key2: ['qwe', 'rty'],
  };

  const obj2 = {
    key1: ['zxc', 'vbn'],
  };

  const result = mergeObjectsWithArrayValues([obj1, obj2]);

  expect(result.key1).toEqual([...obj1.key1, ...obj2.key1]);
  expect(result.key2).toEqual([...obj1.key2]);
});
