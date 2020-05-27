const request = require('supertest');
const User = require('../../../models/User');

let server;

const path = '/api/v1/auth/register';

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
    let newUser;

    const exec = async () => {
      const res = await request(server).post(path).send(newUser);
      return res;
    };

    beforeEach(() => {
      newUser = {
        email: 'john@gmail.com',
        name: 'John Doe',
        password: 'Abc123',
        passwordConfirm: 'Abc123',
      };
    });

    it('should return 400 if name is not provided', async () => {
      newUser.name = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('name');
    });

    it('should return 400 if email is not provided', async () => {
      newUser.email = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('email');
    });

    it('should return 400 if provided email is not a valid email address', async () => {
      newUser.email = 'email';

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('email');
    });

    it('should return 400 if password is not provided', async () => {
      newUser.password = undefined;
      newUser.passwordConfirm = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('password');
    });

    it('should return 400 if password is not strong enough', async () => {
      newUser.password = 'abc123';
      newUser.passwordConfirm = 'abc123';

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('has to contain');
    });

    it('should return 400 if provided passwords do not match', async () => {
      newUser.passwordConfirm = 'abc123';

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('do not match');
    });

    it('should return 400 if a user with the given email already exists', async () => {
      await User.collection.insertOne(newUser);

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('already exists');
    });

    it('should add new user to database if the request is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it('should return a token if the request is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).toBeDefined();
    });
  });
});
