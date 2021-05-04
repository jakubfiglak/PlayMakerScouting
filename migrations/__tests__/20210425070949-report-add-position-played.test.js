const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildOldReport, buildReport } = require('../../test/utils');
const { up, down } = require('../20210425070949-report-add-position-played');

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

test('up function should add position played field based on aggregated player field', async () => {
  const player1 = buildPlayer();
  const player2 = buildPlayer();
  const player3 = buildPlayer();
  await testDB.collection('players').insertMany([player1, player2, player3]);

  const report1 = buildOldReport({ player: player1._id });
  const report2 = buildOldReport({ player: player2._id });
  const report3 = buildOldReport({ player: player3._id });
  await testDB.collection('reports').insertMany([report1, report2, report3]);

  await up(testDB);

  const updatedReports = await testDB.collection('reports').find().toArray();

  expect(updatedReports[0]).toHaveProperty('positionPlayed', player1.position);
  expect(updatedReports[1]).toHaveProperty('positionPlayed', player2.position);
  expect(updatedReports[2]).toHaveProperty('positionPlayed', player3.position);
});

test('down function should unset position played field', async () => {
  const player1 = buildPlayer();
  const player2 = buildPlayer();
  const player3 = buildPlayer();
  await testDB.collection('players').insertMany([player1, player2, player3]);

  const report1 = buildReport({ player: player1._id });
  const report2 = buildReport({ player: player2._id });
  const report3 = buildReport({ player: player3._id });
  await testDB.collection('reports').insertMany([report1, report2, report3]);

  await down(testDB);

  const updatedReports = await testDB.collection('reports').find().toArray();

  expect(updatedReports[0]).not.toHaveProperty('positionPlayed');
  expect(updatedReports[1]).not.toHaveProperty('positionPlayed');
  expect(updatedReports[2]).not.toHaveProperty('positionPlayed');
});
