const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildUser } = require('../../test/utils');
const { insertTestUser, insertUsers } = require('../../test/db-utils');
const usersService = require('../../modules/users/users.service');

let api = axios.create();
let server;

setupTestDB();

beforeAll(async () => {
  server = await startServer();
});

beforeEach(async () => {
  const baseURL = `http://localhost:${server.address().port}/api/v1`;
  const { token } = await insertTestUser({ role: 'admin' });
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

describe('GET /api/v1/dashboard', () => {
  it('should work', async () => {
    const response = await api.get('dashboard');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);

    console.log(response.data.data);
  });
});
