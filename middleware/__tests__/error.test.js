const { Error } = require('mongoose');
const { buildReq, buildRes, buildNext } = require('../../test/utils');
const errorHandler = require('../error');

it('should throw a 404 error if error name is CastError', () => {
  const req = buildReq();
  const res = buildRes();
  const next = buildNext();

  const error = new Error.CastError('SOME-TYPE', 'SOME-RESOURCE-ID', 'SOME-PATH');

  errorHandler(error, req, res, next);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json.mock.calls[0][0].success).toBe(false);
  expect(res.json.mock.calls[0][0].error).toMatchInlineSnapshot(
    '"Resource not found with id of SOME-RESOURCE-ID"'
  );
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(next).not.toHaveBeenCalled();
});

it('should throw a 400 error if error code is 11000 (mongoose duplicate key)', () => {
  const req = buildReq();
  const res = buildRes();
  const next = buildNext();

  const error = new Error();
  error.code = 11000;

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json.mock.calls[0][0].success).toBe(false);
  expect(res.json.mock.calls[0][0].error).toMatchInlineSnapshot('"Duplicate field value entered"');
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(next).not.toHaveBeenCalled();
});

it('should throw a 400 error if error name is ValidationError', () => {
  const req = buildReq();
  const res = buildRes();
  const next = buildNext();

  const error = new Error.ValidationError();
  error.errors = {
    'SOME-KEY': {
      message: 'SOME-VALIDATION-MESSAGE',
    },
  };

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json.mock.calls[0][0].success).toBe(false);
  expect(res.json.mock.calls[0][0].error).toMatchInlineSnapshot('"SOME-VALIDATION-MESSAGE"');
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(next).not.toHaveBeenCalled();
});

it('should throw a 500 error if any other unrecognized error occurs', () => {
  const req = buildReq();
  const res = buildRes();
  const next = buildNext();

  const error = new Error();

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json.mock.calls[0][0].success).toBe(false);
  expect(res.json.mock.calls[0][0].error).toMatchInlineSnapshot('"Server Error"');
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(next).not.toHaveBeenCalled();
});
