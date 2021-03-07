const { protect, authorize } = require('../auth');
const { buildUser } = require('../../test/utils');
const User = require('../../models/User');

describe('route protection middleware', () => {
  it('should throw an 401 error if no token provided', () => {
    const req = { cookies: { token: null } };
    const res = {};
    const next = jest.fn();

    protect(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(401);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"User not authorized to access this route. No token provided"'
    );
  });

  it('should throw an 401 error if the provided token is invalid', () => {
    const req = { cookies: { token: 'some-invalid-token' } };
    const res = {};
    const next = jest.fn();

    protect(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(401);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"User not authorized to access this route. Invalid token."'
    );
  });

  it('should add user to the request object if provided token is valid', () => {
    const userData = buildUser();
    const user = new User(userData);
    const token = user.getJwt();

    const req = { cookies: { token } };
    const res = {};
    const next = jest.fn();

    protect(req, res, next);

    expect(req.user._id.toString()).toBe(user._id.toString());
    expect(req.user.role).toBe(user.role);
    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('role based authorization middleware', () => {
  it('should throw 403 error if user role is not authorized to access the route', () => {
    const req = { user: { role: 'sample-role' } };
    const res = {};
    const next = jest.fn();

    authorize('some-other-role')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(403);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"User role sample-role is not authorized to access this route"'
    );
  });

  it('should call next if user role is authorized to access the route', () => {
    const authorizedRole = 'authorized-role';

    const req = { user: { role: authorizedRole } };
    const res = {};
    const next = jest.fn();

    authorize(authorizedRole)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
