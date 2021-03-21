const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildUser, buildClub } = require('../../test/utils');
const { insertClubs, insertTestUser } = require('../../test/db-utils');
const Club = require('../../models/club.model');

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
    expect(response.data.data).toMatchObject(newClub);

    // Check if the authors id have been successfully put into authorizedUsers array
    const createdClub = await Club.findById(response.data.data.id);
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
    expect(response.data.data.docs[0]).toMatchObject(club1);
    expect(response.data.data.docs[1]).toMatchObject(club2);
    expect(response.data.data.docs[2]).toMatchObject(club3);
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
