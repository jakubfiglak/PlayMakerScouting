const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const accessControlListsService = require('../../modules/accessControlLists/accessControlLists.service');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildUser,
  buildTeam,
  buildAccessControlList,
  buildClub,
  buildPlayer,
} = require('../../test/utils');
const {
  insertTestUser,
  insertUsers,
  insertTeams,
  insertAccessControlLists,
  insertClubs,
  insertPlayers,
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

function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

describe('POST /api/v1/teams', () => {
  it('should return 404 error if at least one of the provided members does not exist', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    await insertUsers([user1, user2]);

    const fakeUserId = new mongoose.Types.ObjectId();

    const team = buildTeam({ members: [user1._id, user2._id, fakeUserId] });

    const { response } = await api.post('teams', team).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"At least one of the members has not been found"'
    );
  });

  it('should return 201 status and the team object, successfully save the team to the database and create access control list for the team if request data is valid', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const club1 = buildClub();
    const club2 = buildClub();
    const player1 = buildPlayer();
    const player2 = buildPlayer();
    await Promise.all([
      insertUsers([user1, user2]),
      insertClubs([club1, club2]),
      insertPlayers([player1, player2]),
    ]);
    const user1acl = buildAccessControlList({
      user: user1._id,
      clubs: [club1._id],
      players: [player1._id],
    });
    const user2acl = buildAccessControlList({
      user: user2._id,
      clubs: [club1._id, club2._id],
      players: [player1._id, player2._id],
    });
    await insertAccessControlLists([user1acl, user2acl]);
    const team = buildTeam({ members: [user1._id, user2._id] });

    const response = await api.post('teams', team);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe(team.name);
    expect(response.data.data.id).toBe(team._id.toHexString());

    // Wait a bit for the ACL to be created after the response is sent
    await wait(100);

    // Check the created ACL
    const createdAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: response.data.data.id,
    });

    expect(createdAcl).not.toBeNull();
    expect(createdAcl.team.id).toBe(team._id.toHexString());
    expect(createdAcl.players.length).toBe(2);
    expect(createdAcl.clubs.length).toBe(2);
    expect(createdAcl.clubs).toContainEqual(club1._id);
    expect(createdAcl.clubs).toContainEqual(club2._id);
    expect(createdAcl.players).toContainEqual(player1._id);
    expect(createdAcl.players).toContainEqual(player2._id);
  });
});

describe('GET /api/v1/teams', () => {
  it('should return all teams', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    await insertUsers([user1, user2]);

    const team1 = buildTeam({ members: [user1._id, user2._id] });
    const team2 = buildTeam({ members: [user1._id, user2._id] });
    const team3 = buildTeam({ members: [user1._id, user2._id] });
    await insertTeams([team1, team2, team3]);

    const response = await api.get('teams');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const teamIds = response.data.data.map((el) => el.id);
    expect(teamIds).toContain(team1._id.toHexString());
    expect(teamIds).toContain(team2._id.toHexString());
    expect(teamIds).toContain(team3._id.toHexString());
  });
});

describe('PUT /api/v1/teams/:id', () => {
  it('should update a team and return new data if request is valid', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const team = buildTeam({ members: [user1._id, user2._id] });

    await insertTeams([team]);

    const editData = { members: [user1._id, user2._id, user3._id] };

    const response = await api.put(`teams/${team._id}`, editData);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe(team.name);
    // expect(response.data.data.members).toEqual(editData.members.map((id) => id.toHexString()));
  });
});

describe('PATCH /api/v1/teams/:id/add-member', () => {
  it('should add new member to the team', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const team = buildTeam({ members: [user1._id, user2._id] });

    await insertTeams([team]);

    const response = await api.patch(`teams/${team._id}/add-member`, { memberId: user3._id });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.members.length).toBe(3);

    const memberIds = response.data.data.members.map((member) => member.id);
    expect(memberIds).toContainEqual(user3._id.toHexString());
  });
});

describe('PATCH /api/v1/teams/:id/remove-member', () => {
  it('should remove a member from the team', async () => {
    const user1 = buildUser();
    const user2 = buildUser();
    const user3 = buildUser();
    await insertUsers([user1, user2, user3]);

    const team = buildTeam({ members: [user1._id, user2._id, user3._id] });

    await insertTeams([team]);

    const response = await api.patch(`teams/${team._id}/remove-member`, { memberId: user3._id });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.members.length).toBe(2);

    const memberIds = response.data.data.members.map((member) => member.id);
    expect(memberIds).not.toContainEqual(user3._id.toHexString());
  });
});
