const calculateAvg = require('../../../utils/calculateAvg');
const calculateObjAvg = require('../../../utils/calculateObjAvg');

describe('testing utility functions', () => {
  describe('calculateAvg function', () => {
    it('should return proper average result', () => {
      const result = calculateAvg(2, 3, 4);
      const result2 = calculateAvg(7, -1, 5, 1);

      expect(result).toEqual(3);
      expect(result2).toEqual(3);
    });
  });

  describe('calculateObjAvg', () => {
    it('should return proper average result when valid object is provided', () => {
      const obj = {
        first: 1,
        second: 2,
        third: 3,
      };

      const result = calculateObjAvg(obj);

      expect(result).toEqual(2);
    });

    it('should ignore the keys starting with $ and return proper average result for other key-value pairs', () => {
      const obj = {
        first: 1,
        second: 2,
        third: 3,
        $sth: 5,
        $sth2: 8,
      };

      const result = calculateObjAvg(obj);

      expect(result).toEqual(2);
    });

    it('should ignore undefined values and retiurn proper average result for other key-value pairs', () => {
      const obj = {
        first: 1,
        second: 2,
        third: 3,
        fourth: undefined,
        fifth: undefined,
      };

      const result = calculateObjAvg(obj);

      expect(result).toEqual(2);
    });

    it('should return proper average result when an object contains keys starting with $ and undefined values', () => {
      const obj = {
        first: 1,
        second: 2,
        third: 3,
        $fourth: 4,
        fifth: undefined,
      };

      const result = calculateObjAvg(obj);

      expect(result).toEqual(2);
    });
  });
});
