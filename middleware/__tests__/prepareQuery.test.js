const prepareQuery = require('../prepareQuery');
const { buildReq, buildRes, buildNext } = require('../../test/utils');
const { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT } = require('../../utils/defaults');

it('should remove all the props starting with a $ sign from requst query object', () => {
  const query = {
    $someProp: 'SOME-PROP',
    $someOtherProp: 'SOME-OTHER-PROP',
  };

  const req = buildReq({ query });
  const res = buildRes();
  const next = buildNext();

  prepareQuery(req, res, next);

  expect(req.query).not.toHaveProperty('$someProp');
  expect(req.query).not.toHaveProperty('$someOtherProp');
  expect(next).toHaveBeenCalledTimes(1);
});

it('should remove select, sort, page and limit props from request query object', () => {
  const query = {
    select: 'SOME-SELECT',
    sort: 'SOME-SORT',
    page: 'SOME-PAGE',
    limit: 'SOME-LIMIT',
    otherProp: 'SOME-OTHER-PROP',
  };

  const req = buildReq({ query });
  const res = buildRes();
  const next = buildNext();

  prepareQuery(req, res, next);

  expect(req.query).toHaveProperty('otherProp');
  expect(req.query).not.toHaveProperty('select');
  expect(req.query).not.toHaveProperty('sort');
  expect(req.query).not.toHaveProperty('page');
  expect(req.query).not.toHaveProperty('limit');
  expect(next).toHaveBeenCalledTimes(1);
});

it('should add a $ sign to mongodb operators in request query object', () => {
  const query = {
    gt: 'GREATER-THAN',
    gte: 'GREATER-THAN-OR-EQUAL-TO',
  };

  const req = buildReq({ query });
  const res = buildRes();
  const next = buildNext();

  prepareQuery(req, res, next);

  expect(req.query).toHaveProperty('$gt');
  expect(req.query).toHaveProperty('$gte');
  expect(req.query).not.toHaveProperty('gte');
  expect(req.query).not.toHaveProperty('gt');
  expect(next).toHaveBeenCalledTimes(1);
});

it('should apply the defaults to paginationOptions if no options provided in request query object', () => {
  const req = buildReq();
  const res = buildRes();
  const next = buildNext();

  prepareQuery(req, res, next);

  expect(req.paginationOptions.sort).toBe(DEFAULT_SORT);
  expect(req.paginationOptions.limit).toBe(DEFAULT_LIMIT);
  expect(req.paginationOptions.page).toBe(DEFAULT_PAGE);
  expect(next).toHaveBeenCalledTimes(1);
});
