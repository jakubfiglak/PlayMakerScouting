const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildClub,
  buildPlayer,
  buildAccessControlList,
  buildTeam,
  buildUser,
  buildReport,
  buildNote,
  buildMatch,
} = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertAccessControlLists,
  insertTeams,
  insertUsers,
  insertReports,
  insertNotes,
  insertMatches,
} = require('../../test/db-utils');
const accessControlListsService = require('../../modules/accessControlLists/accessControlLists.service');
const playersService = require('../../modules/players/players.service');
const reportsService = require('../../modules/reports/reports.service');
const clubsService = require('../../modules/clubs/clubs.service');
const notesService = require('../../modules/notes/notes.service');
const matchesService = require('../../modules/matches/matches.service');

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

describe('POST api/v1/clubs', () => {
  it('should create a club with properly set author field and add created club id to authors ACL and if the user belongs to a team, this teams ACL should also be populated with created club id', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);
    const team = buildTeam({ members: [testUser._id] });
    await insertTeams([team]);
    const teamAcl = buildAccessControlList({ team: team._id });
    await insertAccessControlLists([teamAcl]);

    const club = buildClub();
    const response = await api.post('clubs', club);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new club!"');
    expect(response.data.data.id).toBe(club._id.toHexString());
    expect(response.data.data.name).toBe(club.name);
    expect(response.data.data.author).toBe(testUser._id.toHexString());

    // Check if the users ACL has been successfully updated
    const updatedUsersAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });
    expect(updatedUsersAcl.clubs).toContainEqual(club._id);

    // Check if the teams ACL has been successfully updated
    const updatedTeamsAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });

    expect(updatedTeamsAcl.clubs).toContainEqual(club._id);
  });
});

describe('GET api/v1/clubs', () => {
  it('should return all the clubs if the user is an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('clubs', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);
    expect(response.data.data.docs[0].id).toBe(club1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(club2._id.toHexString());
    expect(response.data.data.docs[2].id).toBe(club3._id.toHexString());
    expect(response.data.data.docs[0].name).toBe(club1.name);
    expect(response.data.data.docs[1].name).toBe(club2.name);
    expect(response.data.data.docs[2].name).toBe(club3.name);
  });

  it('should return only the clubs listed in users ACL if user is not an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);

    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club1._id, club2._id] });
    await insertAccessControlLists([userAcl]);

    const response = await api.get('clubs');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].name).toBe(club1.name);
    expect(response.data.data.docs[1].name).toBe(club2.name);
    expect(response.data.data.docs[0].id).toBe(club1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(club2._id.toHexString());
  });

  it('should return only the clubs listed in teams ACL if user is not an admin and belongs to the team', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();
    await insertClubs([club1, club2, club3]);

    const team = buildTeam({ members: [testUser._id] });
    await insertTeams([team]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    const teamAcl = buildAccessControlList({
      team: team._id,
      clubs: [club1._id, club2._id],
    });
    await insertAccessControlLists([userAcl, teamAcl]);

    const response = await api.get('clubs');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].name).toBe(club1.name);
    expect(response.data.data.docs[1].name).toBe(club2.name);
    expect(response.data.data.docs[0].id).toBe(club1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(club2._id.toHexString());
  });
});

describe('GET api/v1/clubs/list', () => {
  it('should return all the clubs if the user is an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('clubs/list', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const names = response.data.data.map((club) => club.name);

    expect(names).toContain(club1.name);
    expect(names).toContain(club2.name);
    expect(names).toContain(club3.name);
  });

  it('should return only the clubs listed in users ACL if user is not an admin', async () => {
    const club1 = buildClub();
    const club2 = buildClub();
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);

    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club1._id, club2._id] });
    await insertAccessControlLists([userAcl]);

    const response = await api.get('clubs/list');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);
    const names = response.data.data.map((club) => club.name);

    expect(names).toContain(club1.name);
    expect(names).toContain(club2.name);
    expect(names).not.toContain(club3.name);
  });
});

describe('GET api/v1/clubs/:id', () => {
  it('should return club data if user is an admin', async () => {
    const newClub = buildClub();

    await insertClubs([newClub]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`clubs/${newClub._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(newClub._id.toHexString());
    expect(response.data.data.name).toBe(newClub.name);
  });

  it('should return club data if user is authorized', async () => {
    const club = buildClub();
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club._id] });
    await insertAccessControlLists([userAcl]);

    const response = await api.get(`clubs/${club._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(club._id.toHexString());
    expect(response.data.data.name).toBe(club.name);
  });

  it('should return a 403 error if user is not authorized to get club data', async () => {
    const club = buildClub();
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const { response } = await api.get(`clubs/${club._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });
});

describe('PUT /api/v1/clubs/:id', () => {
  it('should return 404 error if the club does not exist', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);
    const { response } = await api.put('clubs/NON-EXISTING-ID', {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if user is not authorized to edit club data', async () => {
    const club = buildClub();
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const { response } = await api.put(`clubs/${club._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('You are not permitted');
  });

  it('should properly update club data if request is valid', async () => {
    const club = buildClub({ author: testUser._id });
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const updates = { name: 'NEW-NAME' };

    const response = await api.put(`clubs/${club._id}`, updates);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe('NEW-NAME');
  });
});

describe('DELETE /api/v1/clubs/:id', () => {
  it('should return 403 error if the club has at least one player assigned to it', async () => {
    const club = buildClub({ author: testUser._id });
    const player = buildPlayer({ club: club._id });
    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club._id] });
    await Promise.all([
      insertClubs([club]),
      insertPlayers([player]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.delete(`clubs/${club._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a club with existing relations to player documents"'
    );
  });

  it('should return 404 error if the club does not exist', async () => {
    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const { response } = await api.delete('clubs/NON-EXISTING-ID').catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if the user is not authorized to delete a club', async () => {
    const club = buildClub();
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const { response } = await api.delete(`clubs/${club._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('You are not permitted');
  });

  it('should delete the club if the request is valid', async () => {
    const club = buildClub({ author: testUser._id });
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id });
    await insertAccessControlLists([userAcl]);

    const response = await api.delete(`clubs/${club._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(club._id.toHexString());
  });
});

describe('POST /api/v1/clubs/merge-duplicates', () => {
  it('should correctly merge duplicate clubs definitions into one', async () => {
    const { token } = await insertTestUser({ role: 'admin' });

    // Create clubs
    const club1 = buildClub({ lnpID: '123' });
    const club2 = buildClub({ lnpID: '123', isPublic: true });
    const club3 = buildClub({ lnpID: '123' });
    const club4 = buildClub({ lnpID: '345' });
    const club5 = buildClub({ lnpID: '345' });
    const club6 = buildClub({ lnpID: '678' });
    const club7 = buildClub();
    const club8 = buildClub();

    const clubs = [club1, club2, club3, club4, club5, club6];
    const clubsToRemain = [club1, club4, club6];

    await insertClubs([...clubs, club7, club8]);

    // Create 2 test users with their ACLs
    const user1 = buildUser();
    const user2 = buildUser();

    const acl1 = buildAccessControlList({ user: user1._id, clubs: [club3._id, club5._id] });
    const acl2 = buildAccessControlList({
      user: user2._id,
      clubs: [club2._id, club5._id, club6._id],
    });

    await Promise.all([insertUsers([user1, user2]), insertAccessControlLists([acl1, acl2])]);

    // Create 6 players - 1 for each club
    const players = clubs.map((club) => buildPlayer({ club: club._id }));

    // Create 6 reports - 1 for each club
    const reports = clubs.map((club) => buildReport({ playerCurrentClub: club._id }));

    // Create 6 notes - 1 for each club
    const notes = clubs.map((club) => buildNote({ playerCurrentClub: club._id }));

    // Create matches - 2 for each club (home and away)
    const homeMatches = clubs.map((club) => buildMatch({ homeTeam: club._id }));
    const awayMatches = clubs.map((club) => buildMatch({ awayTeam: club._id }));

    await Promise.all([
      insertPlayers(players),
      insertReports(reports),
      insertNotes(notes),
      insertMatches([...homeMatches, ...awayMatches]),
    ]);

    await api.post(
      'clubs/merge-duplicates',
      {},
      {
        headers: { Cookie: `token=${token}` },
      }
    );

    const playersOperations = clubsToRemain.map((club) =>
      playersService.getPlayersForClub(club._id)
    );

    const reportsOperations = clubsToRemain.map((club) =>
      reportsService.getReportsForClub(club._id)
    );

    const notesOperations = clubsToRemain.map((club) => notesService.getNotesForClub(club._id));

    const matchesOperations = clubsToRemain.map((club) =>
      matchesService.getMatchesForClub(club._id)
    );

    const [
      club1Players,
      club4Players,
      club6Players,
      club1Reports,
      club4Reports,
      club6Reports,
      club1Notes,
      club4Notes,
      club6Notes,
      club1Matches,
      club4Matches,
      club6Matches,
    ] = await Promise.all([
      ...playersOperations,
      ...reportsOperations,
      ...notesOperations,
      ...matchesOperations,
    ]);

    // Check if there is correct number of assets assigned to each of the clubs
    expect(club1Players.length).toBe(3);
    expect(club4Players.length).toBe(2);
    expect(club6Players.length).toBe(1);
    expect(club1Reports.length).toBe(3);
    expect(club4Reports.length).toBe(2);
    expect(club6Reports.length).toBe(1);
    expect(club1Notes.length).toBe(3);
    expect(club4Notes.length).toBe(2);
    expect(club6Notes.length).toBe(1);
    expect(club1Matches.length).toBe(6);
    expect(club4Matches.length).toBe(4);
    expect(club6Matches.length).toBe(2);

    // Check if correct assets have been assigned to each club
    const club1PlayerIds = club1Players.map((club) => club._id.toHexString());
    const club4PlayerIds = club4Players.map((club) => club._id.toHexString());
    const club6PlayerIds = club6Players.map((club) => club._id.toHexString());
    const club1ReportIds = club1Reports.map((report) => report._id.toHexString());
    const club4ReportIds = club4Reports.map((report) => report._id.toHexString());
    const club6ReportIds = club6Reports.map((report) => report._id.toHexString());
    const club1NoteIds = club1Notes.map((note) => note._id.toHexString());
    const club4NoteIds = club4Notes.map((note) => note._id.toHexString());
    const club6NoteIds = club6Notes.map((note) => note._id.toHexString());
    const club1MatchIds = club1Matches.map((match) => match._id.toHexString());
    const club4MatchIds = club4Matches.map((match) => match._id.toHexString());
    const club6MatchIds = club6Matches.map((match) => match._id.toHexString());

    expect(club1PlayerIds).toContain(players[0]._id.toHexString());
    expect(club1PlayerIds).toContain(players[1]._id.toHexString());
    expect(club1PlayerIds).toContain(players[2]._id.toHexString());
    expect(club4PlayerIds).toContain(players[3]._id.toHexString());
    expect(club4PlayerIds).toContain(players[4]._id.toHexString());
    expect(club6PlayerIds).toContain(players[5]._id.toHexString());

    expect(club1ReportIds).toContain(reports[0]._id.toHexString());
    expect(club1ReportIds).toContain(reports[1]._id.toHexString());
    expect(club1ReportIds).toContain(reports[2]._id.toHexString());
    expect(club4ReportIds).toContain(reports[3]._id.toHexString());
    expect(club4ReportIds).toContain(reports[4]._id.toHexString());
    expect(club6ReportIds).toContain(reports[5]._id.toHexString());

    expect(club1NoteIds).toContain(notes[0]._id.toHexString());
    expect(club1NoteIds).toContain(notes[1]._id.toHexString());
    expect(club1NoteIds).toContain(notes[2]._id.toHexString());
    expect(club4NoteIds).toContain(notes[3]._id.toHexString());
    expect(club4NoteIds).toContain(notes[4]._id.toHexString());
    expect(club6NoteIds).toContain(notes[5]._id.toHexString());

    expect(club1MatchIds).toContain(homeMatches[0]._id.toHexString());
    expect(club1MatchIds).toContain(homeMatches[1]._id.toHexString());
    expect(club1MatchIds).toContain(homeMatches[2]._id.toHexString());
    expect(club4MatchIds).toContain(homeMatches[3]._id.toHexString());
    expect(club4MatchIds).toContain(homeMatches[4]._id.toHexString());
    expect(club6MatchIds).toContain(homeMatches[5]._id.toHexString());
    expect(club1MatchIds).toContain(awayMatches[0]._id.toHexString());
    expect(club1MatchIds).toContain(awayMatches[1]._id.toHexString());
    expect(club1MatchIds).toContain(awayMatches[2]._id.toHexString());
    expect(club4MatchIds).toContain(awayMatches[3]._id.toHexString());
    expect(club4MatchIds).toContain(awayMatches[4]._id.toHexString());
    expect(club6MatchIds).toContain(awayMatches[5]._id.toHexString());

    // Check if there is correct number of reports in the database
    const dbReports = await reportsService.getAllReportsList();
    expect(dbReports.length).toBe(6);

    // Check if there is correct number of notes in the database
    const dbNotes = await notesService.getAllNotesList();
    expect(dbNotes.length).toBe(6);

    // Check if there is correct number of matches in the database
    const dbMatches = await matchesService.getAllMatchesList();
    expect(dbMatches.length).toBe(12);

    // Check if acls has been successfully proccessed
    const dbAcls = await accessControlListsService.getAllAccessControlLists();

    expect(dbAcls[0].clubs).toContainEqual(club1._id);
    expect(dbAcls[0].clubs).toContainEqual(club4._id);
    expect(dbAcls[0].clubs).not.toContainEqual(club3._id);
    expect(dbAcls[0].clubs).not.toContainEqual(club5._id);
    expect(dbAcls[1].clubs).toContainEqual(club1._id);
    expect(dbAcls[1].clubs).toContainEqual(club4._id);
    expect(dbAcls[1].clubs).toContainEqual(club6._id);
    expect(dbAcls[1].clubs).not.toContainEqual(club2._id);
    expect(dbAcls[1].clubs).not.toContainEqual(club5._id);

    // Check if there is corrent number of clubs left in the database
    const dbClubs = await clubsService.getAllClubsList({});
    const dbClubsIds = dbClubs.map((club) => club._id.toHexString());

    expect(dbClubs.length).toBe(5);
    expect(dbClubsIds).toContain(club1._id.toHexString());
    expect(dbClubsIds).not.toContain(club2._id.toHexString());
    expect(dbClubsIds).not.toContain(club3._id.toHexString());
    expect(dbClubsIds).toContain(club4._id.toHexString());
    expect(dbClubsIds).not.toContain(club5._id.toHexString());
    expect(dbClubsIds).toContain(club6._id.toHexString());

    // Check if club1 has isPublic flag set to true (inherited from club2 which is its duplicate)
    const dbClub1 = dbClubs.find((club) => club._id.toHexString() === club1._id.toHexString());
    expect(dbClub1.isPublic).toBe(true);

    // Check if all the other clubs kept isPublic flag set to false
    const filteredDbClubs = dbClubs.filter(
      (club) => club._id.toHexString() !== club1._id.toHexString()
    );
    expect(filteredDbClubs.some((club) => club.isPublic)).toBe(false);
  });
});
