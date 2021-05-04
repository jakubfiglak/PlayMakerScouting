const axios = require('axios').default;
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const { buildRating, buildReportTemplate } = require('../../test/utils');
const { insertTestUser, insertRatings, insertReportTemplates } = require('../../test/db-utils');

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

describe('POST /api/v1/report-templates', () => {
  it('should return 404 error if at least one of the provided ratings does not exist', async () => {
    const rating1 = buildRating();
    const rating2 = buildRating();
    await insertRatings([rating1, rating2]);

    const reportTemplate = buildReportTemplate({
      ratings: [rating1._id, rating2._id, new mongoose.Types.ObjectId()],
    });

    const { response } = await api.post('report-templates', reportTemplate).catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"At least one of the ratings has not been found"'
    );
  });

  it('should set the author field, create new reportTemplate and return it', async () => {
    const rating1 = buildRating();
    const rating2 = buildRating();
    await insertRatings([rating1, rating2]);

    const reportTemplate = buildReportTemplate({
      ratings: [rating1._id, rating2._id],
    });

    const response = await api.post('report-templates', reportTemplate);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.data.author).toBe(testUser._id.toHexString());
  });
});

describe('GET /api/v1/report-templates', () => {
  it('should return all ratings if the user is an admin', async () => {
    const reportTemplate1 = buildReportTemplate();
    const reportTemplate2 = buildReportTemplate();
    const reportTemplate3 = buildReportTemplate();

    await insertReportTemplates([reportTemplate1, reportTemplate2, reportTemplate3]);

    const { token } = await insertTestUser({ role: 'admin' });

    const response = await api.get('report-templates', { headers: { Cookie: `token=${token}` } });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(3);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).toContain(reportTemplate1._id.toHexString());
    expect(orderIds).toContain(reportTemplate2._id.toHexString());
    expect(orderIds).toContain(reportTemplate3._id.toHexString());
  });

  it('should return only reportTemplates authored by the specific user or with the private field set to "false" if the user is not an admin', async () => {
    const reportTemplate1 = buildReportTemplate();
    const reportTemplate2 = buildReportTemplate({ author: testUser._id });
    const reportTemplate3 = buildReportTemplate({ private: false });

    await insertReportTemplates([reportTemplate1, reportTemplate2, reportTemplate3]);
    const response = await api.get('report-templates');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.count).toBe(2);

    const orderIds = response.data.data.map((el) => el.id);
    expect(orderIds).not.toContain(reportTemplate1._id.toHexString());
    expect(orderIds).toContain(reportTemplate2._id.toHexString());
    expect(orderIds).toContain(reportTemplate3._id.toHexString());
  });
});

describe('GET /api/v1/ratings/:id', () => {
  it('should return a 403 error if the user is not permitted to view the reportTemplate', async () => {
    const reportTemplate = buildReportTemplate();
    await insertReportTemplates([reportTemplate]);

    const { response } = await api.get(`report-templates/${reportTemplate._id}`).catch((e) => e);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"You don\'t have access to the rating you\'ve requsted"'
    );
  });

  it('should return report template data if request is valid', async () => {
    const rating1 = buildRating();
    const rating2 = buildRating();
    await insertRatings([rating1, rating2]);

    const reportTemplate = buildReportTemplate({
      author: testUser._id,
      ratings: [rating1._id, rating2._id],
    });
    await insertReportTemplates([reportTemplate]);

    const response = await api.get(`report-templates/${reportTemplate._id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(reportTemplate._id.toHexString());
  });
});
