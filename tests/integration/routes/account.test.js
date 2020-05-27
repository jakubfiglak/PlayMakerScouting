const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../../models/User');

let server;

const path = '/api/v1/auth/account';

describe(path, () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../../server');
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  // TODO:
  describe('GET /', () => {
    it('should return user details', async () => {
      await User.collection.insertOne({
        _id: mongoose.Types.ObjectId().toHexString(),
        email: 'john@gmail.com',
        name: 'John Doe',
        password: 'Abc123',
        passwordConfirm: 'Abc123',
      });

      const token = User().getJwt();

      const res = await request(server)
        .get(path)
        .set('authorization', `Bearer ${token}`);

      // expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty('user');
    });
  });
});
