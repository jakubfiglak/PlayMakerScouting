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

afterAll(() => server.close());

describe('GET /api/v1/users', () => {
  it('should return all users', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const response = await api.get('users');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(4);

    const lastNames = response.data.data.docs.map((user) => user.lastName);
    expect(lastNames).toContain(user1.lastName);
    expect(lastNames).toContain(user2.lastName);
    expect(lastNames).toContain(user3.lastName);
  });
});

describe('GET /api/v1/users/list', () => {
  it('should return all users list', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const response = await api.get('users/list');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(4);

    const lastNames = response.data.data.map((user) => user.lastName);
    expect(lastNames).toContain(user1.lastName);
    expect(lastNames).toContain(user2.lastName);
    expect(lastNames).toContain(user3.lastName);
  });
});

describe('GET /api/v1/users/:id', () => {
  it('should return 404 error if invalid id provided', async () => {
    const { response } = await api.get('users/123').catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"Resource not found with id of 123"');
  });

  it('should return 404 error if user does not exist', async () => {
    const id = new mongoose.Types.ObjectId();

    const { response } = await api.get(`users/${id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('userData not found');
  });

  it('should return user data', async () => {
    const user = buildUser();
    await insertUsers([user]);

    const response = await api.get(`users/${user._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.email).toBe(user.email);
    expect(response.data.data.firstName).toBe(user.firstName);
    expect(response.data.data.lastName).toBe(user.lastName);
  });
});

describe('/api/v1/:id/users/assignplaymaker', () => {
  it('should return 400 error if user is an admin', async () => {
    const user = buildUser({ role: 'admin' });
    await insertUsers([user]);

    const { response } = await api.post(`users/${user._id}/assignplaymaker`).catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot perform this operation on a user with the role of admin"'
    );
  });

  it('should return 400 error if user is already a playmaker scout', async () => {
    const user = buildUser({ role: 'playmaker-scout' });
    await insertUsers([user]);

    const { response } = await api.post(`users/${user._id}/assignplaymaker`).catch((e) => e);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot perform this operation on a user with the role of playmaker-scout"'
    );
  });

  it('should correclty assing playmaker-scout role to the user', async () => {
    const user = buildUser();
    await insertUsers([user]);

    const response = await api.post(`users/${user._id}/assignplaymaker`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.role).toBe('playmaker-scout');
    expect(response.data.data.id).toBe(user._id.toHexString());
    expect(response.data.data.firstName).toBe(user.firstName);
    expect(response.data.data.lastName).toBe(user.lastName);

    // Check if user has not been duplicated
    const users = await usersService.getAllUsersList();
    expect(users.length).toBe(2);
  });
});
