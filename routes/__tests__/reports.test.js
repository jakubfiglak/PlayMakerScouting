const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildClub,
  buildPlayer,
  buildUser,
  buildReport,
  buildAccessControlList,
  buildTeam,
} = require('../../test/utils');
const {
  insertClubs,
  insertTestUser,
  insertPlayers,
  insertUsers,
  insertReports,
  insertAccessControlLists,
  insertTeams,
} = require('../../test/db-utils');
const reportsService = require('../../modules/reports/reports.service');
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

describe('POST /api/v1/reports', () => {
  it('should create a new report, properly calculate report avg ratings, add created report id to authors ACL and if the user belongs to a team, this teams ACL should also be populated with created report id, finally it should return created report with populated data', async () => {
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const userAcl = buildAccessControlList({ user: testUser._id });
    const team = buildTeam({ members: [testUser._id] });
    const teamAcl = buildAccessControlList({ team: team._id });

    await Promise.all([
      insertPlayers([player]),
      insertClubs([club]),
      insertTeams([team]),
      insertAccessControlLists([userAcl, teamAcl]),
    ]);

    const report = buildReport({ player: player._id });

    const response = await api.post('reports', report);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Successfully created new report!"');

    // Check avg calculations
    expect(response.data.data.avgRating).toBe(4);
    expect(response.data.data.percentageRating).toBe(100);

    // Check if the users ACL has been successfully updated
    const updatedUsersAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'user',
      assetId: testUser._id,
    });
    expect(updatedUsersAcl.reports).toContainEqual(report._id);

    // Check if the teams ACL has been successfully updated
    const updatedTeamsAcl = await accessControlListsService.getAccessControlListForAnAsset({
      assetType: 'team',
      assetId: team._id,
    });

    expect(updatedTeamsAcl.reports).toContainEqual(report._id);
  });
});

describe('GET /api/v1/reports', () => {
  it('should return all reports if user is an admin', async () => {
    const scout = buildUser();
    const club = buildClub();
    const player = buildPlayer({ club: club._id });

    await Promise.all([insertPlayers([player]), insertUsers([scout]), insertClubs([club])]);

    const report1 = buildReport({
      player: player._id,
      scout: scout._id,
    });
    const report2 = buildReport({
      player: player._id,
      scout: scout._id,
    });
    const report3 = buildReport({
      player: player._id,
      scout: scout._id,
    });

    await insertReports([report1, report2, report3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('reports', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(3);

    const reportIds = response.data.data.docs.map((el) => el.id);
    expect(reportIds).toContain(report1._id.toHexString());
    expect(reportIds).toContain(report2._id.toHexString());
    expect(reportIds).toContain(report3._id.toHexString());
  });

  it('should return only reports listed in users ACL if user is not an admin', async () => {
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const report1 = buildReport({
      player: player._id,
    });
    const report2 = buildReport({
      player: player._id,
    });
    const report3 = buildReport({
      player: player._id,
    });

    const userAcl = buildAccessControlList({
      user: testUser._id,
      reports: [report1._id, report2._id],
    });

    await Promise.all([
      insertPlayers([player]),
      insertClubs([club]),
      insertReports([report1, report2, report3]),
      insertAccessControlLists([userAcl]),
    ]);
    const response = await api.get('reports');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);

    const reportIds = response.data.data.docs.map((el) => el.id);
    expect(reportIds).toContain(report1._id.toHexString());
    expect(reportIds).toContain(report2._id.toHexString());
    expect(reportIds).not.toContain(report3._id.toHexString());
  });

  it('should return only reports listed in teams ACL if user is not an admin and belongs to the team', async () => {
    const club = buildClub();
    const player = buildPlayer({ club: club._id });
    const report1 = buildReport({
      player: player._id,
    });
    const report2 = buildReport({
      player: player._id,
    });
    const report3 = buildReport({
      player: player._id,
    });

    const team = buildTeam({ members: testUser._id });

    const userAcl = buildAccessControlList({
      user: testUser._id,
    });

    const teamAcl = buildAccessControlList({
      team: team._id,
      reports: [report1._id, report2._id],
    });

    await Promise.all([
      insertPlayers([player]),
      insertClubs([club]),
      insertReports([report1, report2, report3]),
      insertTeams([team]),
      insertAccessControlLists([userAcl, teamAcl]),
    ]);
    const response = await api.get('reports');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.totalDocs).toBe(2);

    const reportIds = response.data.data.docs.map((el) => el.id);
    expect(reportIds).toContain(report1._id.toHexString());
    expect(reportIds).toContain(report2._id.toHexString());
    expect(reportIds).not.toContain(report3._id.toHexString());
  });
});

describe('GET api/v1/reports/:id', () => {
  it('should return report data if user is an admin', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id });

    await Promise.all([insertPlayers(player), insertReports(report)]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get(`reports/${report._id}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(report._id.toHexString());
  });

  it('should return report data if user is authorized', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id });
    const userAcl = buildAccessControlList({ user: testUser._id, reports: [report._id] });

    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);
    const response = await api.get(`reports/${report._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(report._id.toHexString());
  });

  it('should return a 403 error if user is not authorized to get club data', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id });
    const userAcl = buildAccessControlList({ user: testUser._id });

    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.get(`reports/${report._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });
});

describe('PUT /api/v1/reports/:id', () => {
  it('should return 403 error if user is not authorized to edit club data', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id });

    const userAcl = buildAccessControlList({ user: testUser._id });
    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.put(`reports/${report._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toContain("You don't have access");
  });

  it('should return 403 error if report status is "closed"', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id, status: 'closed' });
    const userAcl = buildAccessControlList({ user: testUser._id, reports: [report._id] });

    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const { response } = await api.put(`reports/${report._id}`, {}).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Report has the status of \\"closed\\" and cannot be updated"'
    );
  });

  it('should properly update report data if request is valid', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id });

    const userAcl = buildAccessControlList({ user: testUser._id, reports: [report._id] });

    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const updates = { minutesPlayed: 68, goals: 1 };

    const response = await api.put(`reports/${report._id}`, updates);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);

    expect(response.data.data.minutesPlayed).toBe(68);
    expect(response.data.data.goals).toBe(1);
    expect(response.data.data.summary).toBe(report.summary);
    expect(response.data.data.assists).toBe(report.assists);

    // Check if the report has not been duplicated
    const reports = await reportsService.getAllReports({
      query: {},
      accessFilters: {},
      paginationOptions: {},
    });

    expect(reports.docs.length).toBe(1);
    expect(reports.totalDocs).toBe(1);
  });
});

describe('PATCH /api/v1/reports/:id/set-status', () => {
  it('should correctly set requested report status', async () => {
    const player = buildPlayer();
    const report = buildReport({ player: player._id, status: 'in-prep' });
    const userAcl = buildAccessControlList({ user: testUser._id, reports: [report._id] });

    await Promise.all([
      insertPlayers([player]),
      insertReports([report]),
      insertAccessControlLists([userAcl]),
    ]);

    const response = await api.patch(`reports/${report._id}/set-status`, { status: 'closed' });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toContain('status changed to');
    expect(response.data.data.status).toBe('closed');
  });
});
