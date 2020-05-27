const request = require('supertest');
const User = require('../../../models/User');

let server;

const path = '/api/v1/auth/login';

describe(path, () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../../server');
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe('POST /', () => {
    let payload;

    const exec = async () => {
      const res = await request(server).post(path).send(payload);
      return res;
    };

    beforeEach(() => {
      payload = {
        name: 'John',
        email: 'john@gmail.com',
        password: 'Abc123',
      };
    });

    it('should return 400 if email is not provided', async () => {
      payload.email = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Please provide');
    });

    it('should return 400 if password is not provided', async () => {
      payload.password = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Please provide');
    });

    it('should return 401 if user is not found', async () => {
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid credentials');
    });

    it('should return 401 if passwords do not match', async () => {
      await User.collection.insertOne(payload);

      payload.password = 'abc123';

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid credentials');
    });

    it('should login the user if the request is valid', async () => {
      await User.create(payload);

      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return a token if the request is valid', async () => {
      await User.create(payload);

      const res = await exec();
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).toBeDefined();
    });
  });
});
