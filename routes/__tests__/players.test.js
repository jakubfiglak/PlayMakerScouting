const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildUser } = require('../../test/utils');
const { insertClubs, insertTestUser, insertPlayers, insertUsers } = require('../../test/db-utils');
const Player = require('../../models/player.model');
const { playersService } = require('../../services');

let api = axios.create();
let server;
let testUser;

setupTestDB();

beforeAll(async () => {
  server = await startServer();
  const baseURL = `http://localhost:${server.address().port}/api/v1`;
  const { user, token } = await insertTestUser();
  testUser = user;
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

afterAll(() => server.close());

describe('POST /api/v1/players', () => {
  it('should return 404 error if provided clubId is not valid', async () => {
    const player = buildPlayer({ club: 'NON-EXISTING-CLUB-ID' });

    const { response } = await api.post('players', player).catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-CLUB-ID"'
    );
  });

  it('should create a player with authors id in authorizedUsers array and return the data with populated club name & division', async () => {
    const club = buildClub();
    await insertClubs([club]);
    const player = buildPlayer({ club: club._id });

    const response = await api.post('players', player);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new player!"');
    expect(response.data.data.id).toBe(player._id.toHexString());
    expect(response.data.data.club).toMatchObject({ name: club.name, division: club.division });

    // Check if the authors id have beeen successfully put into authorizedUsers array
    const createdPlayer = await playersService.getPlayerById(player._id);
    expect(createdPlayer.authorizedUsers).toContainEqual(testUser._id);
  });
});
