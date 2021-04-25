const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildReport } = require('../../test/utils');
const { up } = require('../20210425092319-report-recalculate-avgRating');

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

test('up function should add status field', async () => {
  const player1 = buildPlayer();
  await testDB.collection('players').insertOne(player1);

  const report1 = buildReport({ player: player1._id });
  await testDB.collection('reports').insertOne(report1);

  await up(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report1._id });

  expect(updatedReport).toHaveProperty('avgRating', 100);

  expect(true).toBe(true);
});
