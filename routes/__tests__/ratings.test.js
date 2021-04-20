const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildOrder, buildRating } = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertOrders,
  insertRatings,
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
  const { user, token } = await insertTestUser();
  testUser = user;
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

afterAll(() => server.close());

describe('POST /api/v1/ratings', () => {
  it('should set the author field, create new rating and return it', async () => {
    const rating = buildRating();

    const response = await api.post('ratings', rating);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe(rating.name);
    expect(response.data.data.shortName).toBe(rating.shortName);
    expect(response.data.data.author).toBe(testUser._id.toHexString());
  });
});

describe('GET /api/v1/ratings', () => {
  it('should return all ratings if the user is an admin', async () => {
    const rating1 = buildRating();
    const rating2 = buildRating();
    const rating3 = buildRating();
    await insertRatings([rating1, rating2, rating3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('ratings', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).toContain(rating1._id.toHexString());
    expect(orderIds).toContain(rating2._id.toHexString());
    expect(orderIds).toContain(rating3._id.toHexString());
  });

  it('should return only ratings authored by the specific user or with the private field set to "false" if the user is not an admin', async () => {
    const rating1 = buildRating();
    const rating2 = buildRating({ author: testUser._id });
    const rating3 = buildRating({ private: false });
    await insertRatings([rating1, rating2, rating3]);
    const response = await api.get('ratings');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).not.toContain(rating1._id.toHexString());
    expect(orderIds).toContain(rating2._id.toHexString());
    expect(orderIds).toContain(rating3._id.toHexString());
  });
});

describe('GET /api/v1/ratings/:id', () => {
  it('should return a 403 error if the user is not permitted to view the rating', async () => {
    const rating = buildRating();
    await insertRatings([rating]);

    const { response } = await api.get(`ratings/${rating._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the rating you\'ve requsted"'
    );
  });

  it('should return rating data if request is valid', async () => {
    const rating = buildRating({ author: testUser._id });
    await insertRatings([rating]);

    const response = await api.get(`ratings/${rating._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(rating._id.toHexString());
  });
});
