const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildOrder, buildAccessControlList } = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertOrders,
  insertAccessControlLists,
} = require('../../test/db-utils');
const accessControlListsService = require('../../modules/accessControlLists/accessControlLists.service');

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

describe('POST /api/v1/orders', () => {
  it("should return a 404 error if a player with the provided id doesn't exist", async () => {
    const order = buildOrder({ player: new mongoose.Types.ObjectId() });
    const { token } = await insertTestUser({ role: 'admin' });

    const { response } = await api
      .post('orders', order, { headers: { Cookie: `token=${token}` } })
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('not found');
  });

  it('should create a new order with properly set author field and return it with populated player data', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const { token, user } = await insertTestUser({ role: 'admin' });

    const order = buildOrder({ player: player._id });
    const response = await api.post('orders', order, { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new order!"');
    expect(response.data.data.player.firstName).toBe(player.firstName);
    expect(response.data.data.player.lastName).toBe(player.lastName);
    expect(response.data.data.player.id).toBe(player._id.toHexString());
    expect(response.data.data.author).toBe(user._id.toHexString());
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

    const orderIds = response.data.data.docs.map((el) => el.id);
    expect(orderIds).toContain(order1._id.toHexString());
    expect(orderIds).toContain(order2._id.toHexString());
    expect(orderIds).toContain(order3._id.toHexString());
  });

  it('should return only orders with the status of open or assigned to the specific user if user is not an admin', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order1 = buildOrder({ player: player._id });
    const order2 = buildOrder({ player: player._id, status: 'closed' });
    const order3 = buildOrder({ player: player._id, status: 'accepted', scout: testUser._id });
    await insertOrders([order1, order2, order3]);

    const response = await api.get('orders');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);

    const orderIds = response.data.data.docs.map((el) => el.id);
    expect(orderIds).toContain(order1._id.toHexString());
    expect(orderIds).not.toContain(order2._id.toHexString());
    expect(orderIds).toContain(order3._id.toHexString());
  });
});

describe('GET /api/v1/orders/my', () => {
  it('should return all orders assigned to the user sending the request', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order1 = buildOrder({ player: player._id, status: 'closed', scout: testUser._id });
    const order2 = buildOrder({ player: player._id, status: 'closed' });
    const order3 = buildOrder({ player: player._id, status: 'accepted', scout: testUser._id });
    await insertOrders([order1, order2, order3]);

    const response = await api.get('orders/my');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);

    const orderIds = response.data.data.docs.map((el) => el.id);
    expect(orderIds).toContain(order1._id.toHexString());
    expect(orderIds).not.toContain(order2._id.toHexString());
    expect(orderIds).toContain(order3._id.toHexString());
  });
});

describe('GET /api/v1/orders/mylist', () => {
  it('should return a list of all orders with the status of "accepted" assigned to the user sending the request', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order1 = buildOrder({ player: player._id, status: 'closed', scout: testUser._id });
    const order2 = buildOrder({ player: player._id, status: 'closed' });
    const order3 = buildOrder({ player: player._id, status: 'accepted', scout: testUser._id });
    await insertOrders([order1, order2, order3]);

    const response = await api.get('orders/mylist');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(1);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).not.toContain(order1._id.toHexString());
    expect(orderIds).not.toContain(order2._id.toHexString());
    expect(orderIds).toContain(order3._id.toHexString());
  });
});

describe('GET /api/v1/orders/my/:playerId', () => {
  it('should return all orders related to a specific player, assigned to the user sending the request ', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    await insertPlayers([player1, player2]);
    const order1 = buildOrder({ player: player1._id, status: 'closed', scout: testUser._id });
    const order2 = buildOrder({ player: player1._id, status: 'closed' });
    const order3 = buildOrder({ player: player2._id, status: 'accepted', scout: testUser._id });
    await insertOrders([order1, order2, order3]);

    const response = await api.get(`orders/my/${player1._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(1);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).toContain(order1._id.toHexString());
    expect(orderIds).not.toContain(order2._id.toHexString());
    expect(orderIds).not.toContain(order3._id.toHexString());
  });
});

describe('GET /api/v1/orders/:id', () => {
  it('should return a 403 error if the user is not permitted to view the order', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id, status: 'accepted' });
    await insertOrders([order]);

    const { response } = await api.get(`orders/${order._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the asset you\'ve requsted"'
    );
  });

  it('should return a 404 error if the order does not exist', async () => {
    const NON_EXISTING_ID = new mongoose.Types.ObjectId();

    const { response } = await api.get(`orders/${NON_EXISTING_ID}`).catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('order not found with the id of');
  });

  it('should return order data if request is valid', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id });
    await insertOrders([order]);

    const response = await api.get(`orders/${order._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(order._id.toHexString());
  });
});

describe('POST /api/v1/orders/:id/accept', () => {
  it('should return 400 error if the user is trying to accept an order with the status other than "open"', async () => {
    const player = buildPlayer();
    const order = buildOrder({ player: player._id, status: 'accepted' });
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([
      insertPlayers([player]),
      insertOrders([order]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.post(`orders/${order._id}/accept`).catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot perform this operation on an order with the status of accepted"'
    );
  });

  it('should properly accept the order if the request is valid', async () => {
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const order = buildOrder({ player: player._id });
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([
      insertClubs([club]),
      insertPlayers([player]),
      insertOrders([order]),
      insertAccessControlLists([userAcl]),
    ]);

    const response = await api.post(`orders/${order._id}/accept`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully accepted');
    expect(response.data.data.id).toBe(order._id.toHexString());
    expect(response.data.data.status).toBe('accepted');

    // Check if users ACL has been successfully populated with player and club id
    const updatedAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });

    expect(updatedAcl.clubs).toContainEqual(club._id);
    expect(updatedAcl.players).toContainEqual(player._id);
  });
});

describe('POST /api/v1/orders/:id/reject', () => {
  it('should return 400 error if the user is trying to reject an order with the status other than "accepted"', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id, status: 'open' });
    await insertOrders([order]);

    const { response } = await api.post(`orders/${order._id}/reject`).catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot perform this operation on an order with the status of open"'
    );
  });

  it('should return 403 error if the user is trying to reject an order he is not assigned to', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({
      player: player._id,
      status: 'accepted',
      scout: new mongoose.Types.ObjectId(),
    });
    await insertOrders([order]);

    const { response } = await api.post(`orders/${order._id}/reject`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot reject an order you are not assigned to"'
    );
  });

  it('should properly reject the order if the request is valid', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id, status: 'accepted', scout: testUser._id });
    await insertOrders([order]);

    const response = await api.post(`orders/${order._id}/reject`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully rejected');
    expect(response.data.data.id).toBe(order._id.toHexString());
    expect(response.data.data.status).toBe('open');
    expect(response.data.data.scout).toBe(undefined);
  });
});

describe('POST /api/v1/orders/:id/close', () => {
  it('properly close the order if the request is valid', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id, status: 'accepted' });
    await insertOrders([order]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.post(
      `orders/${order._id}/close`,
      {},
      { headers: { Cookie: `token=${token}` } }
    );

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully closed');
    expect(response.data.data.id).toBe(order._id.toHexString());
    expect(response.data.data.status).toBe('closed');
    expect(response.data.data.scout).toBe(undefined);
  });
});

describe('DELETE /api/v1/orders/:id', () => {
  it('properly delete the order if the request is valid', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);
    const order = buildOrder({ player: player._id });
    await insertOrders([order]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.delete(`orders/${order._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(order._id.toHexString());
  });
});
