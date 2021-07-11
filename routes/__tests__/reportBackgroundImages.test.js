const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildAccessControlList,
  buildTeam,
  buildReportBackgroundImage,
} = require('../../test/utils');
const {
  insertTestUser,
  insertAccessControlLists,
  insertTeams,
  insertReportBackgroundImages,
} = require('../../test/db-utils');

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

describe('GET api/v1/report-background-images', () => {
  it('should return all the report background images if the user is an admin', async () => {
    const image1 = buildReportBackgroundImage();
    const image2 = buildReportBackgroundImage();
    const image3 = buildReportBackgroundImage();

    await insertReportBackgroundImages([image1, image2, image3]);
    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('report-background-images', {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);
    expect(response.data.data[0].id).toBe(image1._id.toHexString());
    expect(response.data.data[1].id).toBe(image2._id.toHexString());
    expect(response.data.data[2].id).toBe(image3._id.toHexString());
    expect(response.data.data[0].name).toBe(image1.name);
    expect(response.data.data[1].name).toBe(image2.name);
    expect(response.data.data[2].name).toBe(image3.name);
  });

  it('should return only report background images listed in users ACL or with "isPublic" prop set to true if user is not an admin', async () => {
    const image1 = buildReportBackgroundImage();
    const image2 = buildReportBackgroundImage({ isPublic: true });
    const image3 = buildReportBackgroundImage();
    const userAcl = buildAccessControlList({
      user: testUser._id,
      reportBackgroundImages: [image1._id],
    });

    await Promise.all([
      insertReportBackgroundImages([image1, image2, image3]),
      insertAccessControlLists([userAcl]),
    ]);

    const response = await api.get('report-background-images');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);
    expect(response.data.data[0].name).toBe(image1.name);
    expect(response.data.data[1].name).toBe(image2.name);
    expect(response.data.data[0].id).toBe(image1._id.toHexString());
    expect(response.data.data[1].id).toBe(image2._id.toHexString());
  });

  it('should return only report background images listed in teams ACL or with "isPublic" prop set to true if user is not an admin and belongs to the team', async () => {
    const image1 = buildReportBackgroundImage();
    const image2 = buildReportBackgroundImage({ isPublic: true });
    const image3 = buildReportBackgroundImage();

    const team = buildTeam({ members: [testUser._id] });
    const userAcl = buildAccessControlList({ user: testUser._id });
    const teamAcl = buildAccessControlList({
      team: team._id,
      reportBackgroundImages: [image1._id],
    });

    await Promise.all([
      insertReportBackgroundImages([image1, image2, image3]),
      insertTeams([team]),
      insertAccessControlLists([userAcl, teamAcl]),
    ]);

    const response = await api.get('report-background-images');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);
    expect(response.data.data[0].name).toBe(image1.name);
    expect(response.data.data[1].name).toBe(image2.name);
    expect(response.data.data[0].id).toBe(image1._id.toHexString());
    expect(response.data.data[1].id).toBe(image2._id.toHexString());
  });
});
