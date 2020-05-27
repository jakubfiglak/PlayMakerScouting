const request = require('supertest');
const User = require('../../../models/User');

let server;

describe('auth middlewares', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../../server');
  });

  afterEach(async () => {
    server.close();
  });

  describe('routes protection', () => {
    let token;

    // TODO: change the endpoint to get something simple
    const exec = () =>
      request(server)
        .get('/api/v1/auth/account')
        .set('authorization', `Bearer ${token}`);

    beforeEach(() => {
      token = new User().getJwt();
    });

    it('should return 401 if no token provided', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('No token');
    });

    it('should return 400 if token is invalid', async () => {
      token = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Invalid token');
    });

    // TODO: test the happy path
    // it('should return 200 if valid token provided', async () => {
    //   const res = await exec();
    //   expect(res.status).toBe(200);
    // });
  });
});
