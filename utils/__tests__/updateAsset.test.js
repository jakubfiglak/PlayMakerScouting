const { filterForbiddenUpdates, updateLocalAsset } = require('../updateAsset');

describe('filterForbiddenUpdates', () => {
  it('should properly filter forbidden updates based on passed key array', () => {
    const requestedUpdates = {
      id: 123,
      name: 'TEST',
      breed: 'TEST',
    };
    const forbiddenFields = ['breed'];

    const allowedUpdates = filterForbiddenUpdates({ updates: requestedUpdates, forbiddenFields });
    expect(allowedUpdates).toHaveProperty('id');
    expect(allowedUpdates).toHaveProperty('name');
    expect(allowedUpdates).not.toHaveProperty('breed');
  });
});

describe('updateLocalAsset', () => {
  it("should properly update requested object fields and don't change any other fields", () => {
    const testObject = {
      id: 123,
      name: 'TEST',
      breed: 'TEST',
      doSomething: () => 'hello',
    };

    const updates = {
      id: 345,
      name: 'CHANGE-REQUESTED',
    };

    const updatedTestObject = updateLocalAsset({ asset: testObject, updates });

    expect(updatedTestObject.id).toBe(updates.id);
    expect(updatedTestObject.name).toBe(updates.name);
    expect(updatedTestObject.breed).toBe(testObject.breed);
    expect(updatedTestObject.doSomething).toBe(testObject.doSomething);
  });
});
