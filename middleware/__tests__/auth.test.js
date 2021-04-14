const { protect, authorize } = require('../auth');
const { buildUser, buildReq, buildRes, buildNext } = require('../../test/utils');
const User = require('../../models/user.model');

describe('route protection middleware', () => {
  it('should throw a 401 error if no token provided', () => {
    const req = buildReq({ cookies: { token: null } });
    const res = buildRes();
    const next = buildNext();

    protect(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(401);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"User not authorized to access this route. No token provided"'
    );
  });

  it('should throw a 401 error if the provided token is invalid', () => {
    const req = buildReq({ cookies: { token: 'SOME-INVALID-TOKEN' } });
    const res = buildRes();
    const next = buildNext();

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

    const req = buildReq({ cookies: { token } });
    const res = buildRes();
    const next = buildNext();
    protect(req, res, next);

    expect(req.user._id).toBe(user._id.toString());
    expect(req.user.role).toBe(user.role);
    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('role based authorization middleware', () => {
  it('should throw a 403 error if user role is not authorized to access the route', () => {
    const req = buildReq({ user: { role: 'SOME-ROLE' } });
    const res = buildRes();
    const next = buildNext();

    authorize('SOME-OTHER-ROLE')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(403);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"User role SOME-ROLE is not authorized to access this route"'
    );
  });

  it('should call next if user role is authorized to access the route', () => {
    const authorizedRole = 'AUTHORIZED-ROLE';

    const req = buildReq({ user: { role: authorizedRole } });
    const res = buildRes();
    const next = buildNext();

    authorize(authorizedRole)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
