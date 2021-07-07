const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildReport } = require('../../test/utils');
const { up } = require('../20210707200125-add-report-avgRating');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('clubs').deleteMany();
  await testDB.collection('players').deleteMany();
  await testDB.collection('reports').deleteMany();
});

test('up function should calculate avgRating and set current avgRating value to percentageRating field', async () => {
  const player1 = buildPlayer();
  await testDB.collection('players').insertOne(player1);

  const report1 = buildReport({ player: player1._id, avgRating: 75 });
  await testDB.collection('reports').insertOne(report1);
  await up(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report1._id });
  expect(updatedReport).toHaveProperty('avgRating', 3);
  expect(updatedReport).toHaveProperty('percentageRating', 75);
});
