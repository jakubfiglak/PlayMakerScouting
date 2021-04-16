const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildClub, buildPlayer, buildUser } = require('../../test/utils');
const { insertClubs, insertTestUser, insertPlayers, insertUsers } = require('../../test/db-utils');
const clubsService = require('../../modules/clubs/clubs.service');

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

describe('POST api/v1/clubs', () => {
  it('should create a club with authors id in authorizedUsers array', async () => {
    const newClub = buildClub();
    const response = await api.post('clubs', newClub);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new club!"');
    expect(response.data.data.id).toBe(newClub._id.toHexString());
    expect(response.data.data.name).toBe(newClub.name);

    // Check if the authors id have been successfully put into authorizedUsers array
    const createdClub = await clubsService.getClubById(newClub._id);
    expect(createdClub.authorizedUsers).toContainEqual(testUser._id);
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

  it('should return only the clubs with users id in authorizedUsers array if user is not an admin', async () => {
    const club1 = buildClub({ authorizedUsers: [testUser._id] });
    const club2 = buildClub({ authorizedUsers: [testUser._id] });
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);

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

  it('should return only the clubs with users id in authorizedUsers array if user is not an admin', async () => {
    const club1 = buildClub({ authorizedUsers: [testUser._id] });
    const club2 = buildClub({ authorizedUsers: [testUser._id] });
    const club3 = buildClub();

    await insertClubs([club1, club2, club3]);

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
    const newClub = buildClub({ authorizedUsers: [testUser._id] });

    await insertClubs([newClub]);

    const response = await api.get(`clubs/${newClub._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(newClub._id.toHexString());
    expect(response.data.data.name).toBe(newClub.name);
  });

  it('should return a 403 error if user is not authorized to get club data', async () => {
    const newClub = buildClub();

    await insertClubs([newClub]);

    const { response } = await api.get(`clubs/${newClub._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });
});

describe('PUT /api/v1/clubs/:id', () => {
  it('should return 404 error if the club does not exist', async () => {
    const { response } = await api.put('clubs/NON-EXISTING-ID', {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if user is not authorized to edit club data', async () => {
    const newClub = buildClub();

    await insertClubs([newClub]);

    const { response } = await api.put(`clubs/${newClub._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should properly update club data if request is valid', async () => {
    const newClub = buildClub({ authorizedUsers: [testUser._id] });
    await insertClubs([newClub]);
    const updates = { name: 'NEW-NAME', authorizedUsers: ['FAKE-USERID1', 'FAKE-USERID2'] };

    const response = await api.put(`clubs/${newClub._id}`, updates);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe('NEW-NAME');

    // Check if the authorizedUsers array remained unchanged
    const club = await clubsService.getClubById(newClub._id);
    expect(club.authorizedUsers).toContainEqual(testUser._id);
    expect(club.authorizedUsers).not.toContain('FAKE-USERID1');
    expect(club.authorizedUsers).not.toContain('FAKE-USERID2');
  });
});

describe('DELETE /api/v1/clubs/:id', () => {
  it('should return 403 error if the club has at least one player assigned to it', async () => {
    const newClub = buildClub({ authorizedUsers: [testUser._id] });
    const newPlayer = buildPlayer({ club: newClub._id });
    await Promise.all([insertClubs([newClub]), insertPlayers([newPlayer])]);

    const { response } = await api.delete(`clubs/${newClub._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You cannot delete a club with existing relations to player documents"'
    );
  });

  it('should return 404 error if the club does not exist', async () => {
    const { response } = await api.delete('clubs/NON-EXISTING-ID').catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Resource not found with id of NON-EXISTING-ID"'
    );
  });

  it('should return 403 error if the user is not authorized to delete a club', async () => {
    const newClub = buildClub();
    await insertClubs([newClub]);

    const { response } = await api.delete(`clubs/${newClub._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should delete the club if the request is valid', async () => {
    const newClub = buildClub({ authorizedUsers: [testUser._id] });
    await insertClubs([newClub]);

    const response = await api.delete(`clubs/${newClub._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(newClub._id.toHexString());
  });
});

describe('POST /api/v1/clubs/:id/grantaccess', () => {
  it('should return 404 error if user does not exist', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const newClub = buildClub();
    await insertClubs([newClub]);

    const requestBody = {
      user: new mongoose.Types.ObjectId().toHexString(),
    };

    const { response } = await api
      .post(`clubs/${newClub._id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('not found');
  });

  it('should return 404 error if club does not exist', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    await insertUsers([user]);

    const id = new mongoose.Types.ObjectId().toHexString();

    const requestBody = {
      user: user._id.toHexString(),
    };

    const { response } = await api
      .post(`clubs/${id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('club not found');
  });

  it('should return 400 error if user already has access to the club', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    const club = buildClub({ authorizedUsers: [user._id.toHexString()] });
    await Promise.all([insertClubs([club]), insertUsers([user])]);

    const requestBody = {
      user: user._id.toHexString(),
    };

    const { response } = await api
      .post(`clubs/${club._id}/grantaccess`, requestBody, {
        headers: { Cookie: `token=${token}` },
      })
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain('already has access');
  });

  it('should add user id to clubs authorizedUsers array if the request is valid', async () => {
    const { token } = await insertTestUser({ role: 'admin' });
    const user = buildUser();
    const club = buildClub();
    await Promise.all([insertClubs([club]), insertUsers([user])]);

    const requestBody = {
      user: user._id.toHexString(),
      club: club._id.toHexString(),
    };

    const response = await api.post(`clubs/${club._id}/grantaccess`, requestBody, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('Successfully granted the user with the id of');

    // Check if the authorizedUsers has been populated with user id
    const DBclub = await clubsService.getClubById(club._id);
    expect(DBclub.authorizedUsers).toContainEqual(user._id);
  });
});
