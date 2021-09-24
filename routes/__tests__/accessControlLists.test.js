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
  buildGrantAccessFormMultiple,
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
      assetToAddType: 'club',
      assetToAddId: club._id,
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
      assetToAddType: 'club',
      assetToAddId: club._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
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
      assetToAddType: 'club',
      assetToAddId: club._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
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
      assetToAddType: 'player',
      assetToAddId: player._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
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
      assetToAddType: 'report',
      assetToAddId: report._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
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
      assetToAddType: 'match',
      assetToAddId: match._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
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
      assetToAddType: 'note',
      assetToAddId: note._id,
    });

    const response = await api.patch('access-control-lists/grant-access', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.matches).toContainEqual(match._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.players).toContainEqual(player._id.toHexString());
    expect(response.data.data.notes).toContainEqual(note._id.toHexString());
  });
});

describe('PATCH /api/v1/access-control-lists/grant-access-multiple', () => {
  it('should correctly grant access to players and their clubs if assetToAddType is "player"', async () => {
    const user = buildUser();
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();
    const player1 = buildPlayer({ club: club1._id });
    const player2 = buildPlayer({ club: club2._id });
    const player3 = buildPlayer({ club: club3._id });

    const userAcl = buildAccessControlList({
      user: user._id,
      clubs: [club1._id],
      players: [player1._id],
    });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2, club3]),
      insertPlayers([player1, player2, player3]),
    ]);

    const data = buildGrantAccessFormMultiple({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'player',
      assetToAddIds: [player1._id, player2._id, player3._id],
    });

    const response = await api.patch('access-control-lists/grant-access-multiple', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.players).toContainEqual(player1._id.toHexString());
    expect(response.data.data.players).toContainEqual(player2._id.toHexString());
    expect(response.data.data.players).toContainEqual(player3._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club3._id.toHexString());
  });

  it('should correctly grant access to reports and their players, playerCurrentClubs and players clubs if assetToAddType is "report"', async () => {
    const user = buildUser();
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();
    const player1 = buildPlayer({ club: club1._id });
    const player2 = buildPlayer({ club: club2._id });
    const player3 = buildPlayer({ club: club3._id });
    const report1 = buildReport({ player: player1._id, playerCurrentClub: club1._id });
    const report2 = buildReport({ player: player2._id, playerCurrentClub: club2._id });
    const report3 = buildReport({ player: player3._id, playerCurrentClub: club2._id });
    const userAcl = buildAccessControlList({
      user: user._id,
      clubs: [club1._id],
      players: [player1._id],
    });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2, club3]),
      insertPlayers([player1, player2, player3]),
      insertReports([report1, report2, report3]),
    ]);

    const data = buildGrantAccessFormMultiple({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'report',
      assetToAddIds: [report1._id, report2._id, report3._id],
    });

    const response = await api.patch('access-control-lists/grant-access-multiple', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.players).toContainEqual(player1._id.toHexString());
    expect(response.data.data.players).toContainEqual(player2._id.toHexString());
    expect(response.data.data.players).toContainEqual(player3._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club3._id.toHexString());
    expect(response.data.data.reports).toContainEqual(report1._id.toHexString());
    expect(response.data.data.reports).toContainEqual(report2._id.toHexString());
    expect(response.data.data.reports).toContainEqual(report3._id.toHexString());
  });

  it('should correctly grant access to matches and their clubs if assetToAddType is "match"', async () => {
    const user = buildUser();
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();
    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const match2 = buildMatch({ homeTeam: club1._id, awayTeam: club3._id });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club2._id });
    const userAcl = buildAccessControlList({
      user: user._id,
      clubs: [club1._id],
    });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3]),
    ]);

    const data = buildGrantAccessFormMultiple({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'match',
      assetToAddIds: [match1._id, match2._id, match3._id],
    });

    const response = await api.patch('access-control-lists/grant-access-multiple', data);

    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.matches).toContainEqual(match1._id.toHexString());
    expect(response.data.data.matches).toContainEqual(match2._id.toHexString());
    expect(response.data.data.matches).toContainEqual(match3._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club3._id.toHexString());
  });

  it('should correctly grant access to notes, their players, matches and clubs, player clubs and matches clubs if assetToAddType is "note"', async () => {
    const user = buildUser();
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();
    const player1 = buildPlayer({ club: club1._id });
    const player2 = buildPlayer({ club: club2._id });
    const match1 = buildMatch({ homeTeam: club1._id, awayTeam: club2._id });
    const match2 = buildMatch({ homeTeam: club1._id, awayTeam: club3._id });
    const match3 = buildMatch({ homeTeam: club3._id, awayTeam: club2._id });
    const note1 = buildNote({
      player: player1._id,
      playerCurrentClub: club1._id,
      match: match1._id,
    });
    const note2 = buildNote({ player: player2._id });
    const note3 = buildNote();
    const userAcl = buildAccessControlList({
      user: user._id,
      clubs: [club1._id],
    });

    await Promise.all([
      insertUsers([user]),
      insertAccessControlLists([userAcl]),
      insertPlayers([player1, player2]),
      insertClubs([club1, club2, club3]),
      insertMatches([match1, match2, match3]),
      insertNotes([note1, note2, note3]),
    ]);

    const data = buildGrantAccessFormMultiple({
      targetAssetType: 'user',
      targetAssetId: user._id,
      assetToAddType: 'note',
      assetToAddIds: [note1._id, note2._id, note3._id],
    });

    const response = await api.patch('access-control-lists/grant-access-multiple', data);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted');
    expect(response.data.data.players).toContainEqual(player1._id.toHexString());
    expect(response.data.data.players).toContainEqual(player2._id.toHexString());
    expect(response.data.data.matches).toContainEqual(match1._id.toHexString());
    expect(response.data.data.matches).not.toContainEqual(match2._id.toHexString());
    expect(response.data.data.matches).not.toContainEqual(match3._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club1._id.toHexString());
    expect(response.data.data.clubs).toContainEqual(club2._id.toHexString());
    expect(response.data.data.clubs).not.toContainEqual(club3._id.toHexString());
  });
});
