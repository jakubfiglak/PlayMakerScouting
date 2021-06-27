const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildAccessControlList,
  buildUser,
  buildTeam,
  buildClub,
  buildGrantAccessForm,
} = require('../../test/utils');
const {
  insertTestUser,
  insertAccessControlLists,
  insertUsers,
  insertTeams,
  insertClubs,
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
    expect(response.data.data).toBeNull();
  });
});

describe('PATCH /api/v1/access-control-lists/grant-access', () => {
  it('should throw 404 error if ACL with provided params cannot be found', async () => {
    const user = buildUser();
    const club = buildClub();

    await Promise.all([insertUsers([user]), insertClubs([club])]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'club',
      assetToAddId: club._id,
    });

    const { response } = await api.patch('access-control-lists/grant-access', data).catch((e) => e);

    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(`"No ACL found with provided params"`);
  });

  it('should grant user with the access to the requested asset', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const club = buildClub();

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'club',
      assetToAddId: club._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.clubs).toContainEqual(club._id.toHexString());
  });

  it('should grant team with the access to the requested asset', async () => {
    const team = buildTeam();
    const teamAcl = buildAccessControlList({ team: team._id });
    const club = buildClub();

    await Promise.all([
      insertTeams([team]),
      insertAccessControlLists([teamAcl]),
      insertClubs([club]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'team',
      targetAssetId: team._id,
      assetToAddType: 'club',
      assetToAddId: club._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.clubs).toContainEqual(club._id.toHexString());
  });
});
