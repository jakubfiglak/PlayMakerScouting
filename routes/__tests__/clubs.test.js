const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildAccessControlList, buildTeam } = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertAccessControlLists,
  insertTeams,
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
  const { user, token } = await insertTestUser();
  testUser = user;
  api = axios.create({ baseURL, headers: { Cookie: `token=${token}` } });
});

afterAll(() => server.close());

describe('POST api/v1/clubs', () => {
  it("should create a club and add created club id to author's ACL and if the user belongs to a team, this teams ACL should also be populated with created club id", async () => {
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
    expect(response.data.error).toContain("You don't have access");
  });

  it('should properly update club data if request is valid', async () => {
    const club = buildClub({ authorizedUsers: [testUser._id] });
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club._id] });
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
    const club = buildClub({ authorizedUsers: [testUser._id] });
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
    expect(response.data.error).toContain("You don't have access");
  });

  it('should delete the club if the request is valid', async () => {
    const club = buildClub({ authorizedUsers: [testUser._id] });
    await insertClubs([club]);

    const userAcl = buildAccessControlList({ user: testUser._id, clubs: [club._id] });
    await insertAccessControlLists([userAcl]);

    const response = await api.delete(`clubs/${club._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(club._id.toHexString());
  });
});
