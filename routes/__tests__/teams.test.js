const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildUser, buildTeam } = require('../../test/utils');
const { insertTestUser, insertUsers, insertTeams } = require('../../test/db-utils');

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

describe('POST /api/v1/teams', () => {
  it('should return 404 error if at least one of the provided members does not exist', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    await insertUsers([user1, user2]);

    const fakeUserId = new mongoose.Types.ObjectId();

    const team = buildTeam({ members: [user1._id, user2._id, fakeUserId] });

    const { response } = await api.post('teams', team).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"At least one of the members has not been found"'
    );
  });

  it('should create new team and return it if request is valid', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    await insertUsers([user1, user2]);
    const team = buildTeam({ members: [user1._id, user2._id] });

    const response = await api.post('teams', team);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe(team.name);
    expect(response.data.data.id).toBe(team._id.toHexString());
  });
});

describe('GET /api/v1/teams', () => {
  it('should return all teams', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    await insertUsers([user1, user2]);

    const team1 = buildTeam({ members: [user1._id, user2._id] });
    const team2 = buildTeam({ members: [user1._id, user2._id] });
    const team3 = buildTeam({ members: [user1._id, user2._id] });
    await insertTeams([team1, team2, team3]);

    const response = await api.get('teams');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const teamIds = response.data.data.map((el) => el.id);
    expect(teamIds).toContain(team1._id.toHexString());
    expect(teamIds).toContain(team2._id.toHexString());
    expect(teamIds).toContain(team3._id.toHexString());
  });
});

describe('PUT /api/v1/teams/:id', () => {
  it('should update a team and return new data if request is valid', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const team = buildTeam({ members: [user1._id, user2._id] });

    await insertTeams([team]);

    const editData = { members: [user1._id, user2._id, user3._id] };

    const response = await api.put(`teams/${team._id}`, editData);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe(team.name);
    expect(response.data.data.members).toEqual(editData.members.map((id) => id.toHexString()));
  });
});
