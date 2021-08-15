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
  buildMatch,
  buildNote,
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
  insertMatches,
  insertNotes,
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

describe('POST /api/v1/matches', () => {
  it('should create a match with properly set author field, add created match id to authors and author teams ACL and return the correctly populated data', async () => {
    const club1 = buildClub();
    const club2 = buildClub();

    const userAcl = buildAccessControlList({ user: testUser._id });
    const team = buildTeam({ members: [testUser._id] });
    const teamAcl = buildAccessControlList({ team: team._id });

    await Promise.all([
      insertClubs([club1, club2]),
      insertAccessControlLists([userAcl, teamAcl]),
      insertTeams([team]),
    ]);

    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });

    const response = await api.post('matches', match);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new match"');

    expect(response.data.data.id).toBe(match._id.toHexString());
    expect(response.data.data.author).toBe(testUser._id.toHexString());
    expect(response.data.data.homeTeam.name).toBe(club1.name);
    expect(response.data.data.awayTeam.name).toBe(club2.name);

    // Check if the users ACL has been successfully updated
    const updatedUsersAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });

    expect(updatedUsersAcl.matches).toContainEqual(match._id);

    // Check if the teams ACL has been successfully updated
    const updatedTeamsAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });

    expect(updatedTeamsAcl.matches).toContainEqual(match._id);
  });
});

describe('GET api/v1/players', () => {
  it('should return all matches if user is an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const match2 = buildMatch({ homeTeam: club2._id, awayTeam: club3._id });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club1._id });

    await Promise.all([
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3]),
    ]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('matches', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);
    expect(response.data.data.docs[0].id).toBe(match1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(match2._id.toHexString());
    expect(response.data.data.docs[2].id).toBe(match3._id.toHexString());
  });

  it('should return only matches listed in users ACL or with the "isPublic" flag set to true if user is not an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const match2 = buildMatch({ homeTeam: club2._id, awayTeam: club3._id, isPublic: true });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club1._id });

    const userAcl = buildAccessControlList({
      user: testUser._id,
      matches: [match3._id],
    });

    await Promise.all([
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3]),
    ]);
    const response = await api.get('matches');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(match2._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(match3._id.toHexString());
  });
});

describe('GET /api/v1/clubs/:clubId/matches', () => {
  it('should return all the club matches if user is an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const match2 = buildMatch({ homeTeam: club2._id, awayTeam: club3._id });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club1._id });

    await Promise.all([
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3]),
    ]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`clubs/${club1._id}/matches`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(match1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(match3._id.toHexString());
  });

  it('should return only matches listed in users ACL or with the "isPublic" flag set to true if user is not an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id, isPublic: true });
    const match2 = buildMatch({ homeTeam: club2._id, awayTeam: club3._id, isPublic: true });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club1._id });
    const match4 = buildMatch({ homeTeam: club1._id, awayTeam: club3._id });

    const userAcl = buildAccessControlList({
      user: testUser._id,
      matches: [match3._id],
    });

    await Promise.all([
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3, match4]),
    ]);
    const response = await api.get(`clubs/${club1._id}/matches`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(match1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(match3._id.toHexString());
  });
});

describe('GET /api/v1/matches/:id', () => {
  it('should return match data if user is an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match])]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`matches/${match._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(match._id.toHexString());
    expect(response.data.data.homeTeam.name).toBe(club1.name);
    expect(response.data.data.awayTeam.name).toBe(club2.name);
  });

  it('should return match data if user is authorized', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const userAcl = buildAccessControlList({ user: testUser._id, matches: [match._id] });

    await Promise.all([
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2]),
      insertMatches([match]),
    ]);
    const response = await api.get(`matches/${match._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(match._id.toHexString());
    expect(response.data.data.homeTeam.name).toBe(club1.name);
    expect(response.data.data.awayTeam.name).toBe(club2.name);
  });

  it('should return match data if the match is public', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id, isPublic: true });
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2]),
      insertMatches([match]),
    ]);
    const response = await api.get(`matches/${match._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(match._id.toHexString());
    expect(response.data.data.homeTeam.name).toBe(club1.name);
    expect(response.data.data.awayTeam.name).toBe(club2.name);
  });

  it('should return 403 error if user is not authorized', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2]),
      insertMatches([match]),
    ]);
    const { response } = await api.get(`matches/${match._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the match you\'ve requsted"'
    );
  });
});

describe('PUT /api/v1/matches/:id', () => {
  it('should return 403 error if user is not authorized', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match])]);
    const { response } = await api.put(`matches/${match._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You are not permitted to perform this operation"'
    );
  });

  it('should correctly update match data if request is valid', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id, author: testUser._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match])]);

    const newDate = new Date();

    const updates = { competition: 'cup', date: newDate };

    const response = await api.put(`matches/${match._id}`, updates);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.homeTeam.name).toBe(club1.name);
    expect(response.data.data.awayTeam.name).toBe(club2.name);
    expect(response.data.data.competition).toBe('cup');
    expect(response.data.data.date).toBe(newDate.toISOString());
  });
});

describe('DELETE /api/v1/matches/:id', () => {
  it('should return 403 error if the match is related to at least one note document', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id, author: testUser._id });
    const note = buildNote({ match: match._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match]), insertNotes([note])]);

    const { response } = await api.delete(`matches/${match._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a match with existing relations to notes documents"'
    );
  });

  it('should return 403 error if user is not authorized to delete a match', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match])]);

    const { response } = await api.delete(`matches/${match._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You are not permitted to perform this operation"'
    );
  });

  it('should delete a match if request is valid', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id, author: testUser._id });

    await Promise.all([insertClubs([club1, club2]), insertMatches([match])]);

    const response = await api.delete(`matches/${match._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(match._id.toHexString());
  });
});
