const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildClub,
  buildPlayer,
  buildOrder,
  buildReport,
  buildAccessControlList,
  buildTeam,
  buildUser,
} = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertOrders,
  insertReports,
  insertAccessControlLists,
  insertTeams,
  insertUsers,
} = require('../../test/db-utils');
const accessControlListsService = require('../../modules/accessControlLists/accessControlLists.service');
const reportsService = require('../../modules/reports/reports.service');
const ordersService = require('../../modules/orders/orders.service');
const playersService = require('../../modules/players/players.service');

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

describe('POST /api/v1/players', () => {
  it('should return 404 error if provided clubId is not valid', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const player = buildPlayer({ club: 'NON-EXISTING-CLUB-ID' });

    const { response } = await api.post('players', player).catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-CLUB-ID"'
    );
  });

  it('should create a player, add created player id to authors and author teams ACL and return the data with populated club name & division', async () => {
    const club = buildClub();
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    const team = buildTeam({ members: [testUser._id] });
    const teamAcl = buildAccessControlList({ team: team._id });

    await Promise.all([insertAccessControlLists([userAcl, teamAcl]), insertTeams([team])]);

    const player = buildPlayer({ club: club._id });

    const response = await api.post('players', player);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new player!"');
    expect(response.data.data.id).toBe(player._id.toHexString());
    expect(response.data.data.club).toMatchObject({ name: club.name, division: club.division });

    // Check if the users ACL has been successfully updated
    const updatedUsersAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });
    expect(updatedUsersAcl.players).toContainEqual(player._id);

    // Check if the teams ACL has been successfully updated
    const updatedTeamsAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });

    expect(updatedTeamsAcl.players).toContainEqual(player._id);
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

  it('should return only the players listed in users ACL if user is not an admin', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    const player3 = buildPlayer();

    await insertPlayers([player1, player2, player3]);

    const userAcl = buildAccessControlList({
      user: testUser._id,
      players: [player1._id, player2._id],
    });
    await insertAccessControlLists([userAcl]);

    const response = await api.get('players');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(player1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(player2._id.toHexString());
    expect(response.data.data.docs[0].lastName).toBe(player1.lastName);
    expect(response.data.data.docs[1].lastName).toBe(player2.lastName);
  });

  it('should return only the players listed in teams ACL if user is not an admin and belongs to the team', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    const player3 = buildPlayer();

    const userAcl = buildAccessControlList({ user: testUser._id });
    const team = buildTeam({ members: [testUser._id] });
    const teamAcl = buildAccessControlList({ team: team._id, players: [player1._id, player2._id] });

    await Promise.all([
      insertPlayers([player1, player2, player3]),
      insertTeams([team]),
      insertAccessControlLists([userAcl, teamAcl]),
    ]);

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

  it('should return players for a club listed in users ACL if the user is not an admin', async () => {
    const club = buildClub();
    const player1 = buildPlayer({ club: club._id });
    const player2 = buildPlayer({ club: club._id });
    const player3 = buildPlayer();
    const userAcl = buildAccessControlList({ user: testUser._id, players: [player2._id] });

    await Promise.all([
      insertClubs([club]),
      insertPlayers([player1, player2, player3]),
      insertAccessControlLists([userAcl]),
    ]);

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

  it('should return only the players listed in users ACL if user is not an admin', async () => {
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    const player3 = buildPlayer();

    const userAcl = buildAccessControlList({
      user: testUser._id,
      players: [player1._id, player2._id],
    });

    await Promise.all([
      insertPlayers([player1, player2, player3]),
      insertAccessControlLists([userAcl]),
    ]);

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
    const userAcl = buildAccessControlList({ user: testUser._id, players: [player._id] });

    await Promise.all([insertPlayers([player]), insertAccessControlLists([userAcl])]);

    const response = await api.get(`players/${player._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(player._id.toHexString());
    expect(response.data.data.lastName).toBe(player.lastName);
  });

  it('should return a 403 error if user is not authorized to get club data', async () => {
    const player = buildPlayer();
    const userAcl = buildAccessControlList({ user: testUser._id });
    await Promise.all([insertPlayers([player]), insertAccessControlLists([userAcl])]);

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
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);
    const { response } = await api.put('players/NON-EXISTING-ID', {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if user is not authorized to edit player data', async () => {
    const player = buildPlayer();
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([insertPlayers([player]), insertAccessControlLists([userAcl])]);

    const { response } = await api.put(`players/${player._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should properly update player data if request is valid', async () => {
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const userAcl = buildAccessControlList({ user: testUser._id, players: [player._id] });

    await Promise.all([
      insertClubs([club]),
      insertPlayers([player]),
      insertAccessControlLists([userAcl]),
    ]);

    const updates = {
      firstName: 'NEW-FIRST-NAME',
      lastName: 'NEW-LAST-NAME',
    };

    const response = await api.put(`players/${player._id}`, updates);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.firstName).toBe('NEW-FIRST-NAME');
    expect(response.data.data.lastName).toBe('NEW-LAST-NAME');
    expect(response.data.data.club.name).toBe(club.name);
    expect(response.data.data.club.division).toBe(club.division);
  });
});

describe('DELETE /api/v1/clubs/:id', () => {
  it('should return 403 error if the player is related to at least one order document', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });
    const userAcl = buildAccessControlList({ user: testUser._id, players: player._id });
    const order = buildOrder({ player: player._id });
    await Promise.all([
      insertPlayers([player]),
      insertOrders([order]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a player with existing relations to order documents"'
    );
  });

  it('should return 403 error if the player is related to at least one report document', async () => {
    const player = buildPlayer();
    const userAcl = buildAccessControlList({ user: testUser._id, players: [player._id] });
    const report = buildReport({ scout: testUser._id, player: player._id });
    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a player with existing relations to report documents"'
    );
  });

  it('should return 404 error if the player does not exist', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const { response } = await api.delete('players/NON-EXISTING-ID').catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if the user is not authorized to delete a club', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    const player = buildPlayer();
    await Promise.all([insertPlayers([player]), insertAccessControlLists(userAcl)]);

    const { response } = await api.delete(`players/${player._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should delete the player if the request is valid', async () => {
    const player = buildPlayer({ authorizedUsers: [testUser._id] });
    const userAcl = buildAccessControlList({ user: testUser._id, players: [player._id] });
    await Promise.all([insertPlayers([player]), insertAccessControlLists([userAcl])]);

    const response = await api.delete(`players/${player._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(player._id.toHexString());
  });
});

describe('POST /api/v1/players/merge-duplicates', () => {
  it('should correctly merge duplicate players definitions into one', async () => {
    const { token } = await insertTestUser({ role: 'admin' });

    // Create players
    const player1 = buildPlayer({ lnpID: '123' });
    const player2 = buildPlayer({ lnpID: '123' });
    const player3 = buildPlayer({ lnpID: '123' });
    const player4 = buildPlayer({ lnpID: '345' });
    const player5 = buildPlayer({ lnpID: '345' });
    const player6 = buildPlayer({ lnpID: '678' });

    const players = [player1, player2, player3, player4, player5, player6];
    const playersToRemain = [player1, player4, player6];

    await insertPlayers(players);

    // Create 2 test users with their ACLs
    const user1 = buildUser();
    const user2 = buildUser();

    const acl1 = buildAccessControlList({ user: user1._id, players: [player3._id, player5._id] });
    const acl2 = buildAccessControlList({
      user: user2._id,
      players: [player2._id, player5._id, player6._id],
    });
    await Promise.all([insertUsers([user1, user2]), insertAccessControlLists([acl1, acl2])]);

    // Create 6 reports - 1 for each player
    const reports = players.map((player) => buildReport({ player: player._id }));

    // Create 6 orders - 1 for each player
    const orders = players.map((player) => buildOrder({ player: player._id }));

    await Promise.all([insertReports(reports), insertOrders(orders)]);

    await api.post(
      'players/merge-duplicates',
      {},
      {
        headers: { Cookie: `token=${token}` },
      }
    );

    const reportsOperations = playersToRemain.map((player) =>
      reportsService.getReportsForPlayer(player._id)
    );
    const ordersOperations = playersToRemain.map((player) =>
      ordersService.getOrdersForPlayer(player._id)
    );

    const [
      player1Reports,
      player4Reports,
      player6Reports,
      player1Orders,
      player4Orders,
      player6Orders,
    ] = await Promise.all([...reportsOperations, ...ordersOperations]);

    // Check if there is correct number of reports and orders assigned to each of the players
    expect(player1Reports.length).toBe(3);
    expect(player4Reports.length).toBe(2);
    expect(player6Reports.length).toBe(1);
    expect(player1Orders.length).toBe(3);
    expect(player4Orders.length).toBe(2);
    expect(player6Orders.length).toBe(1);

    // Check if correct reports and orders have been assigned to each player
    const player1ReportIds = player1Reports.map((report) => report._id.toHexString());
    const player4ReportIds = player4Reports.map((report) => report._id.toHexString());
    const player6ReportIds = player6Reports.map((report) => report._id.toHexString());
    const player1OrderIds = player1Orders.map((order) => order._id.toHexString());
    const player4OrderIds = player4Orders.map((order) => order._id.toHexString());
    const player6OrderIds = player6Orders.map((order) => order._id.toHexString());

    expect(player1ReportIds).toContain(reports[0]._id.toHexString());
    expect(player1ReportIds).toContain(reports[1]._id.toHexString());
    expect(player1ReportIds).toContain(reports[2]._id.toHexString());
    expect(player4ReportIds).toContain(reports[3]._id.toHexString());
    expect(player4ReportIds).toContain(reports[4]._id.toHexString());
    expect(player6ReportIds).toContain(reports[5]._id.toHexString());

    expect(player1OrderIds).toContain(orders[0]._id.toHexString());
    expect(player1OrderIds).toContain(orders[1]._id.toHexString());
    expect(player1OrderIds).toContain(orders[2]._id.toHexString());
    expect(player4OrderIds).toContain(orders[3]._id.toHexString());
    expect(player4OrderIds).toContain(orders[4]._id.toHexString());
    expect(player6OrderIds).toContain(orders[5]._id.toHexString());

    // Check if there is correct number of reports in the database
    const dbReports = await reportsService.getAllReportsList();
    expect(dbReports.length).toBe(6);

    // Check if acls has been successfully proccessed
    const dbAcls = await accessControlListsService.getAllAccessControlLists();

    expect(dbAcls[0].players).toContainEqual(player1._id);
    expect(dbAcls[0].players).toContainEqual(player4._id);
    expect(dbAcls[0].players).not.toContainEqual(player3._id);
    expect(dbAcls[0].players).not.toContainEqual(player5._id);
    expect(dbAcls[1].players).toContainEqual(player1._id);
    expect(dbAcls[1].players).toContainEqual(player4._id);
    expect(dbAcls[1].players).toContainEqual(player6._id);
    expect(dbAcls[1].players).not.toContainEqual(player2._id);
    expect(dbAcls[1].players).not.toContainEqual(player5._id);

    // Check if there is corrent number of players left in the database
    const dbPlayers = await playersService.getAllPlayersList({});
    const dbPlayersIds = dbPlayers.map((player) => player._id.toHexString());

    expect(dbPlayers.length).toBe(3);
    expect(dbPlayersIds).toContain(player1._id.toHexString());
    expect(dbPlayersIds).not.toContain(player2._id.toHexString());
    expect(dbPlayersIds).not.toContain(player3._id.toHexString());
    expect(dbPlayersIds).toContain(player4._id.toHexString());
    expect(dbPlayersIds).not.toContain(player5._id.toHexString());
    expect(dbPlayersIds).toContain(player6._id.toHexString());
  });
});
