const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildAccessControlList,
  buildUser,
  buildTeam,
  buildClub,
  buildPlayer,
  buildGrantAccessForm,
  buildReport,
  buildMatch,
  buildNote,
} = require('../../test/utils');
const {
  insertTestUser,
  insertAccessControlLists,
  insertUsers,
  insertTeams,
  insertClubs,
  insertPlayers,
  insertReports,
  insertMatches,
  insertNotes,
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
    });

    const { response } = await api.patch('access-control-lists/grant-access', data).catch((e) => e);

    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"No ACL found with provided params"');
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
      clubs: [club._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
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
      clubs: [club._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.clubs).toContainEqual(club._id.toHexString());
  });

  it('should grant access to players club if assetToAddType is "player"', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const club = buildClub();
    const player = buildPlayer({ club: club._id });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club]),
      insertPlayers([player]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      players: [player._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.players).toContainEqual(player._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club._id.toHexString());
  });

  it('should grant access to the player and players club if assetToAddType is "report"', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const report = buildReport({ player: player._id });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club]),
      insertPlayers([player]),
      insertReports([report]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      reports: [report._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.reports).toContainEqual(report._id.toHexString());
    expect(response.data.data.players).toContainEqual(player._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club._id.toHexString());
  });

  it('should grant access to the homeTeam and awayTeam if assetToAddType is "match"', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2]),
      insertMatches([match]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      matches: [match._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.matches).toContainEqual(match._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
  });

  it('should grant access to the player, match, homeTeam and awayTeam if assetToAddType is "note"', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const club1 = buildClub();
    const club2 = buildClub();
    const match = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const player = buildPlayer();
    const note = buildNote({ match: match._id, player: player._id });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2]),
      insertMatches([match]),
      insertPlayers([player]),
      insertNotes([note]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      notes: [note._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.matches).toContainEqual(match._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.players).toContainEqual(player._id.toHexString());
    expect(response.data.data.notes).toContainEqual(note._id.toHexString());
  });

  it('should correctly grant access to a note with partial data', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });
    const note = buildNote();

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertNotes([note]),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      notes: [note._id],
    });

    const response = await api.patch('access-control-lists/grant-access', data).catch((e) => e);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
  });

  it('should correctly grant access when multiple values are passed in', async () => {
    const user = buildUser();
    const userAcl = buildAccessControlList({ user: user._id });

    // Clubs to grant access to
    const club1 = buildClub();
    const club2 = buildClub();

    // Players to grant access to
    const club3 = buildClub();
    const club4 = buildClub();
    const player1 = buildPlayer({ club: club3._id });
    const player2 = buildPlayer({ club: club4._id });

    // Matches to grant access to
    const club5 = buildClub();
    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club5._id });
    const match2 = buildMatch({ homeTeam: club4._id, awayTeam: club3._id });

    // Notes to grant access to
    const note1 = buildNote();
    const note2 = buildNote({ match: match2._id, player: player1._id });

    // Reports to grant access to
    const report1 = buildReport({ player: player1._id, playerCurrentClub: club3._id });
    const report2 = buildReport({ player: player2._id, playerCurrentClub: club4._id });

    function getIdsArray(assetsArray) {
      return assetsArray.map((asset) => asset._id);
    }

    const clubs = [club1, club2, club3, club4, club5];
    const clubsIds = getIdsArray(clubs);
    const players = [player1, player2];
    const playersIds = getIdsArray(players);
    const matches = [match1, match2];
    const matchesIds = getIdsArray(matches);
    const notes = [note1, note2];
    const notesIds = getIdsArray(notes);
    const reports = [report1, report2];
    const reportsIds = getIdsArray(reports);

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs(clubs),
      insertPlayers(players),
      insertMatches(matches),
      insertNotes(notes),
      insertReports(reports),
    ]);

    const data = buildGrantAccessForm({
      targetAssetType: 'user',
      targetAssetId: user._id,
      clubs: clubsIds,
      players: playersIds,
      matches: matchesIds,
      notes: notesIds,
      reports: reportsIds,
    });

    const response = await api.patch('access-control-lists/grant-access', data);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully granted');
    expect(response.data.data.clubs.length).toBe(clubs.length);
    expect(response.data.data.clubs).toEqual(clubsIds.map((id) => id.toHexString()));
    expect(response.data.data.players.length).toBe(players.length);
    expect(response.data.data.players).toEqual(playersIds.map((id) => id.toHexString()));
    expect(response.data.data.matches.length).toBe(matches.length);
    expect(response.data.data.matches).toEqual(matchesIds.map((id) => id.toHexString()));
    expect(response.data.data.notes.length).toBe(notes.length);
    expect(response.data.data.notes).toEqual(notesIds.map((id) => id.toHexString()));
    expect(response.data.data.reports.length).toBe(reports.length);
    expect(response.data.data.reports).toEqual(reportsIds.map((id) => id.toHexString()));
  });
});
