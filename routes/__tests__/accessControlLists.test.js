const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildAccessControlList, buildUser, buildTeam } = require('../../test/utils');
const {
  insertTestUser,
  insertAccessControlLists,
  insertUsers,
  insertTeams,
} = require('../../test/db-utils');

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

describe('GET /api/v1/access-control-lists', () => {
  it('should return all access control lists', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const team = buildTeam();
    await Promise.all([insertUsers([user1, user2]), insertTeams([team])]);
    const acl1 = buildAccessControlList({ user: user1._id });
    const acl2 = buildAccessControlList({ user: user2._id });
    const acl3 = buildAccessControlList({ team: team._id });
    await insertAccessControlLists([acl1, acl2, acl3]);

    const response = await api.get('access-control-lists');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);
  });
});

describe('GET /api/v1/access-control-lists/:assetType/:assetId', () => {
  it('should return ACL for a user if assetType is equal to user', async () => {
    const user = buildUser();
    await insertUsers([user]);
    const acl = buildAccessControlList({ user: user._id });

    await insertAccessControlLists([acl]);

    const response = await api.get(`access-control-lists/user/${user._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
  });

  it('should return ACL for a team if assetType is equal to team', async () => {
    const team = buildTeam();
    await insertTeams([team]);
    const acl = buildAccessControlList({ team: team._id });

    await insertAccessControlLists([acl]);

    const response = await api.get(`access-control-lists/team/${team._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
  });

  it('should return nothing if a request is not valid', async () => {
    const response = await api.get(
      'access-control-lists/SOME_NOT_VALID_ASSET_TYPE/NOT_VALID_ASSET_ID'
    );

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.length).toEqual(0);
  });
});
