const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildAccessControlList,
  buildTeam,
  buildMatch,
  buildNote,
  buildPlayer,
  buildUser,
} = require('../../test/utils');
const {
  insertTestUser,
  insertAccessControlLists,
  insertTeams,
  insertMatches,
  insertNotes,
  insertPlayers,
  insertUsers,
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

describe('POST /api/v1/notes', () => {
  it('should create a note with properly set author field, add created note id to authors and author teams ACL and return the correctly populated data', async () => {
    const match = buildMatch();
    const player = buildPlayer();

    const userAcl = buildAccessControlList({ user: testUser._id });
    const team = buildTeam({ members: [testUser._id] });
    const teamAcl = buildAccessControlList({ team: team._id });

    await Promise.all([
      insertPlayers([player]),
      insertMatches([match]),
      insertAccessControlLists([userAcl, teamAcl]),
      insertTeams([team]),
    ]);

    const note = buildNote({ match: match._id, player: player._id });

    const response = await api.post('notes', note);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new note!"');
    expect(response.data.data.id).toBe(note._id.toHexString());
    expect(response.data.data.author.id).toBe(testUser._id.toHexString());

    // Check if the users ACL has been successfully updated
    const updatedUsersAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });

    expect(updatedUsersAcl.notes).toContainEqual(note._id);

    // Check if the teams ACL has been successfully updated
    const updatedTeamsAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });

    expect(updatedTeamsAcl.notes).toContainEqual(note._id);
  });
});

describe('GET api/v1/notes', () => {
  it('should return all notes if user is an admin', async () => {
    const note1 = buildNote();
    const note2 = buildNote();
    const note3 = buildNote();

    await insertNotes([note1, note2, note3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('notes', { headers: { Cookie: `token=${token}` } });
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);
    expect(response.data.data.docs[0].id).toBe(note1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(note2._id.toHexString());
    expect(response.data.data.docs[2].id).toBe(note3._id.toHexString());
  });

  it('should return only notes listed in users ACL if user is not an admin', async () => {
    const note1 = buildNote();
    const note2 = buildNote();
    const note3 = buildNote();

    const userAcl = buildAccessControlList({
      user: testUser._id,
      notes: [note1._id, note2._id],
    });

    await Promise.all([insertAccessControlLists([userAcl]), insertNotes([note1, note2, note3])]);

    const response = await api.get('notes');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);
    expect(response.data.data.docs[0].id).toBe(note1._id.toHexString());
    expect(response.data.data.docs[1].id).toBe(note2._id.toHexString());
  });
});

describe('GET /api/v1/notes/:id', () => {
  it('should return note data if user is an admin', async () => {
    const note = buildNote();

    await insertNotes([note]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`notes/${note._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(note._id.toHexString());
  });

  it('should return note data if user is authorized', async () => {
    const note = buildNote();
    const userAcl = buildAccessControlList({ user: testUser._id, notes: [note._id] });

    await Promise.all([insertAccessControlLists([userAcl]), insertNotes([note])]);
    const response = await api.get(`notes/${note._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(note._id.toHexString());
  });

  it('should return 403 error if user is not authorized', async () => {
    const note = buildNote();
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([insertAccessControlLists([userAcl]), insertNotes([note])]);
    const { response } = await api.get(`notes/${note._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the note you\'ve requsted"'
    );
  });
});

describe('PUT /api/v1/notes/:id', () => {
  it('should return 403 error if user is not authorized', async () => {
    const anotherUser = buildUser();
    const note = buildNote({ author: anotherUser._id });
    await Promise.all([insertUsers([anotherUser]), insertNotes([note])]);

    const { response } = await api.put(`notes/${note._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You are not permitted to perform this operation"'
    );
  });

  it('should correctly update note data if request is valid', async () => {
    const note = buildNote({ author: testUser._id });
    await insertNotes([note]);

    const updates = { text: 'TEST-TEXT' };

    const response = await api.put(`notes/${note._id}`, updates);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.text).toBe('TEST-TEXT');
  });
});

describe('DELETE /api/v1/matches/:id', () => {
  it('should return 403 error if user is not authorized to delete a note', async () => {
    const anotherUser = buildUser();
    const note = buildNote({ author: anotherUser._id });
    await Promise.all([insertUsers([anotherUser]), insertNotes([note])]);

    const { response } = await api.delete(`notes/${note._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You are not permitted to perform this operation"'
    );
  });

  it('should delete a note if request is valid', async () => {
    const note = buildNote({ author: testUser._id });
    await insertNotes([note]);
    const response = await api.delete(`notes/${note._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('successfully removed');
    expect(response.data.data).toBe(note._id.toHexString());
  });
});
