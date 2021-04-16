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
const playersService = require('../../modules/players/players.service');

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

    // Check if the authors id has beeen successfully put into authorizedUsers array
    const createdPlayer = await playersService.getPlayerById(player._id);
    expect(createdPlayer.authorizedUsers).toContainEqual(testUser._id);
  });
});

describe('GET /api/v1/players', () => {
  it('should return all the players if the user is an admin', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    const player3 = buildPlayer();

    await insertPlayers([player1, player2, player3]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('players', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);
    expect(response.data.data.docs[0].id).toBe(player1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(player2._id.toHexString());
    expect(response.data.data.docs[2].id).toBe(player3._id.toHexString());
    expect(response.data.data.docs[0].lastName).toBe(player1.lastName);
    expect(response.data.data.docs[1].lastName).toBe(player2.lastName);
    expect(response.data.data.docs[2].lastName).toBe(player3.lastName);
  });

  it('should return only the players with users id in authorizedUsers array if user is not an admin', async () => {
    const player1 = buildPlayer({ authorizedUsers: [testUser._id] });
    const player2 = buildPlayer({ authorizedUsers: [testUser._id] });
    const player3 = buildPlayer();

    await insertPlayers([player1, player2, player3]);

    const response = await api.get('players');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(player1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(player2._id.toHexString());
    expect(response.data.data.docs[0].lastName).toBe(player1.lastName);
    expect(response.data.data.docs[1].lastName).toBe(player2.lastName);
  });
});

describe('GET /api/v1/clubs/:clubId/players', () => {
  it('should return all the players for a club if the user is an admin', async () => {
    const club = buildClub();
    const player1 = buildPlayer({ club: club._id });
    const player2 = buildPlayer({ club: club._id });
    const player3 = buildPlayer();

    await Promise.all([insertClubs([club]), insertPlayers([player1, player2, player3])]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`clubs/${club._id.toHexString()}/players`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(player1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(player2._id.toHexString());
    expect(response.data.data.docs[0].lastName).toBe(player1.lastName);
    expect(response.data.data.docs[1].lastName).toBe(player2.lastName);
  });

  it('should return players for a club with users id in authorizedUsers array  if the user is not an admin', async () => {
    const club = buildClub();
    const player1 = buildPlayer({ club: club._id });
    const player2 = buildPlayer({ club: club._id, authorizedUsers: [testUser._id] });
    const player3 = buildPlayer();

    await Promise.all([insertClubs([club]), insertPlayers([player1, player2, player3])]);

    const response = await api.get(`clubs/${club._id.toHexString()}/players`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(1);
    expect(response.data.data.docs[0].id).toBe(player2._id.toHexString());
    expect(response.data.data.docs[0].club.name).toBe(club.name);
    expect(response.data.data.docs[0].lastName).toBe(player2.lastName);
  });
});

describe('GET /api/v1/players/list', () => {
  it('should return all the players if the user is an admin', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    const player3 = buildPlayer();

    await insertPlayers([player1, player2, player3]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('players/list', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const names = response.data.data.map((player) => player.lastName);

    expect(names).toContain(player1.lastName);
    expect(names).toContain(player2.lastName);
    expect(names).toContain(player3.lastName);
  });

  it('should return only the players with users id in authorizedUsers array if user is not an admin', async () => {
    const player1 = buildPlayer({ authorizedUsers: [testUser._id] });
    const player2 = buildPlayer({ authorizedUsers: [testUser._id] });
    const player3 = buildPlayer();

    await insertPlayers([player1, player2, player3]);

    const response = await api.get('players/list');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);

    const names = response.data.data.map((player) => player.lastName);

    expect(names).toContain(player1.lastName);
    expect(names).toContain(player2.lastName);
    expect(names).not.toContain(player3.lastName);
  });
});

describe('GET /api/v1/players/:id', () => {
  it('should return player data if user is an admin', async () => {
    const player = buildPlayer();

    await insertPlayers([player]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`players/${player._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(player._id.toHexString());
    expect(response.data.data.lastName).toBe(player.lastName);
  });

  it('should return player data if user is authorized', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });

    await insertPlayers([player]);

    const response = await api.get(`players/${player._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(player._id.toHexString());
    expect(response.data.data.lastName).toBe(player.lastName);
  });

  it('should return a 403 error if user is not authorized to get club data', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);

    const { response } = await api.get(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the player you\'ve requsted"'
    );
  });
});

describe('PUT /api/v1/players/:id', () => {
  it('should return 404 error if the player does not exist', async () => {
    const { response } = await api.put('players/NON-EXISTING-ID', {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if user is not authorized to edit player data', async () => {
    const player = buildPlayer();

    await insertPlayers([player]);

    const { response } = await api.put(`players/${player._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should properly update player data if request is valid', async () => {
    const club = buildClub();
    await insertClubs([club]);
    const player = buildPlayer({ authorizedUsers: [testUser._id], club: club._id });
    await insertPlayers([player]);
    const updates = {
      firstName: 'NEW-FIRST-NAME',
      lastName: 'NEW-LAST-NAME',
      authorizedUsers: ['FAKE-USERID1', 'FAKE-USERID2'],
    };

    const response = await api.put(`players/${player._id}`, updates);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.firstName).toBe('NEW-FIRST-NAME');
    expect(response.data.data.lastName).toBe('NEW-LAST-NAME');
    expect(response.data.data.club.name).toBe(club.name);
    expect(response.data.data.club.division).toBe(club.division);

    // Check if the authorizedUsers array remained unchanged
    const dbPlayer = await playersService.getPlayerById(player._id);
    expect(dbPlayer.authorizedUsers).toContainEqual(testUser._id);
    expect(dbPlayer.authorizedUsers).not.toContain('FAKE-USERID1');
    expect(dbPlayer.authorizedUsers).not.toContain('FAKE-USERID2');
  });
});

describe('DELETE /api/v1/clubs/:id', () => {
  it('should return 403 error if the player is related to at least one order document', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });
    const order = buildOrder({ player: player._id });
    await Promise.all([insertPlayers([player]), insertOrders([order])]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a player with existing relations to order documents"'
    );
  });

  it('should return 403 error if the player is related to at least one report document', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });
    const report = buildReport({ scout: testUser._id, player: player._id });
    await Promise.all([insertPlayers([player]), insertReports([report])]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a player with existing relations to report documents"'
    );
  });

  it('should return 404 error if the player does not exist', async () => {
    const { response } = await api.delete('players/NON-EXISTING-ID').catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if the user is not authorized to delete a club', async () => {
    const player = buildPlayer();
    await insertPlayers([player]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should delete the player if the request is valid', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });
    await insertPlayers([player]);

    const response = await api.delete(`players/${player._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(player._id.toHexString());
  });
});

describe('POST /api/v1/players/:id/grantaccess', () => {
  it('should return 404 error if user does not exist', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const player = buildPlayer();
    await insertPlayers([player]);

    const requestBody = {
      user: new mongoose.Types.ObjectId().toHexString(),
    };

    const { response } = await api
      .post(`players/${player._id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('not found');
  });

  it('should return 404 error if player does not exist', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    await insertUsers([user]);

    const id = new mongoose.Types.ObjectId().toHexString();

    const requestBody = {
      user: user._id,
    };

    const { response } = await api
      .post(`players/${id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('player not found');
  });

  it('should return 400 error if user already has access to the player', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    const player = buildPlayer({ authorizedUsers: [user._id.toHexString()] });
    await Promise.all([insertPlayers([player]), insertUsers([user])]);

    const requestBody = {
      user: user._id,
    };

    const { response } = await api
      .post(`players/${player._id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('already has access');
  });

  it('should add user id to players authorizedUsers array if the request is valid', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    const player = buildPlayer();
    await Promise.all([insertPlayers([player]), insertUsers([user])]);

    const requestBody = {
      user: user._id,
    };

    const response = await api.post(`players/${player._id}/grantaccess`, requestBody, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted the user with the id of');

    // Check if the authorizedUsers has been populated with user id
    const DBplayer = await playersService.getPlayerById(player._id);
    expect(DBplayer.authorizedUsers).toContainEqual(user._id);
  });
});
