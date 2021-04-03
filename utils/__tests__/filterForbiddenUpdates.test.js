const filterForbiddenUpdates = require('../filterForbiddenUpdates');

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
