const filterForbiddenUpdates = require('../filterForbiddenUpdates');
const { buildReq, buildRes, buildNext } = require('../../test/utils');

it('should filter out forbidden updates from request query object', () => {
  const updates = {
    someProp: 'SOME-PROP',
    someOtherProp: 'SOME-OTHER-PROP',
    forbiddenProp: 'FORBIDDEN-PROP',
    otherForbiddenProp: 'OTHER-FORBIDDEN-PROP',
  };

  const forbiddenFields = ['forbiddenProp', 'otherForbiddenProp'];

  const req = buildReq({ body: updates });
  const res = buildRes();
  const next = buildNext();

  filterForbiddenUpdates(forbiddenFields)(req, res, next);

  expect(req.body).not.toHaveProperty('forbiddenProp');
  expect(req.body).not.toHaveProperty('otherForbiddenProp');
  expect(req.body).toHaveProperty('someProp');
  expect(req.body).toHaveProperty('someOtherProp');
  expect(next).toHaveBeenCalledTimes(1);
});
