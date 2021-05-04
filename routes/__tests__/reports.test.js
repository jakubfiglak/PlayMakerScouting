const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildOrder, buildUser, buildReport } = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertOrders,
  insertUsers,
  insertReports,
} = require('../../test/db-utils');
const playersService = require('../../modules/players/players.service');
const clubsService = require('../../modules/clubs/clubs.service');

let api = axios.create();
let server;
let testUser;

setupTestDB();

beforeAll(async () => {
  server = await startServer();
});

beforeEach(async () => {
  const baseURL = `http://localhost:${server.address().port}/api/v1`;
  const { user, token } = await insertTestUser({ role: 'playmaker-scout' });
  testUser = user;
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

afterAll(() => server.close());

describe('POST /api/v1/reports', () => {
  it('should create a new report and return it with populated data', async () => {
    const player = buildPlayer();
    const club = buildClub();

    await Promise.all([insertPlayers([player]), insertClubs([club])]);

    const report = buildReport({ player: player._id, playerCurrentClub: club._id });

    const response = await api.post('reports', report);
    console.log(response.data.data.skills);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new report!"');
  });
});

describe('GET /api/v1/reports', () => {
  it('should return all reports if user is an admin', async () => {
    const player = buildPlayer();
    const scout = buildUser();
    const club = buildClub();

    await Promise.all([insertPlayers([player]), insertUsers([scout]), insertClubs([club])]);

    const report1 = buildReport({
      player: player._id,
      scout: scout._id,
      playerCurrentClub: club._id,
    });
    const report2 = buildReport({
      player: player._id,
      scout: scout._id,
      playerCurrentClub: club._id,
    });
    const report3 = buildReport({
      player: player._id,
      scout: scout._id,
      playerCurrentClub: club._id,
    });

    await insertReports([report1, report2, report3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('reports', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);

    const reportIds = response.data.data.docs.map((el) => el.id);
    expect(reportIds).toContain(report1._id.toHexString());
    expect(reportIds).toContain(report2._id.toHexString());
    expect(reportIds).toContain(report3._id.toHexString());
  });
});
