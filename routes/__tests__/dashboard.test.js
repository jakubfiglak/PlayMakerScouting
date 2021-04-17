const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { insertTestUser } = require('../../test/db-utils');

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

// TODO: test this route when reports are refactored

describe('GET /api/v1/dashboard', () => {
  it('should work', async () => {
    const response = await api.get('dashboard');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);

    console.log(response.data.data);
  });
});
