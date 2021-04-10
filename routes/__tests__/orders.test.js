const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildUser, buildOrder, buildReport } = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertUsers,
  insertOrders,
  insertReports,
} = require('../../test/db-utils');
const dbService = require('../../services/db.service');

let api = axios.create();
let server;
let testUser;

setupTestDB();

beforeAll(async () => {
  server = await startServer();
  const baseURL = `http://localhost:${server.address().port}/api/v1`;
  const { user, token } = await insertTestUser({ role: 'playmaker-scout' });
  testUser = user;
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

afterAll(() => server.close());

describe('POST /api/v1/orders', () => {
  it("should return a 404 error if a player with the provided id doesn't exist", async () => {
    const order = buildOrder({ player: new mongoose.Types.ObjectId() });
    const { token } = await insertTestUser({ role: 'admin' });

    const { response } = await api
      .post('orders', order, { headers: { Cookie: `token=${token}` } })
      .catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('player not found');
  });

  it('should create a new order and return it with populated player data', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const { token } = await insertTestUser({ role: 'admin' });

    const order = buildOrder({ player: player._id });
    const response = await api.post('orders', order, { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new order!"');
    expect(response.data.data.player.firstName).toBe(player.firstName);
    expect(response.data.data.player.lastName).toBe(player.lastName);
    expect(response.data.data.player.id).toBe(player._id.toHexString());
  });
});

describe('GET /api/v1/orders', () => {
  it('should return all orders if the user is an admin', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order1 = buildOrder({ player: player._id });
    const order2 = buildOrder({ player: player._id });
    const order3 = buildOrder({ player: player._id });
    await insertOrders([order1, order2, order3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('orders', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);
    expect(response.data.data.docs[0].id).toBe(order1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(order2._id.toHexString());
    expect(response.data.data.docs[2].id).toBe(order3._id.toHexString());
  });
});
