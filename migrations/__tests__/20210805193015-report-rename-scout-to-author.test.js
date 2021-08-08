const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildReport, buildUser } = require('../../test/utils');
const { up, down } = require('../20210805193015-report-rename-scout-to-author');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('players').deleteMany();
  await testDB.collection('reports').deleteMany();
});

test('up function should set report scout field to author field', async () => {
  const player = buildPlayer();
  await testDB.collection('players').insertOne(player);

  const user = buildUser();
  await testDB.collection('users').insertOne(user);

  const report = buildReport({ player: player._id, scout: user._id });
  await testDB.collection('reports').insertOne(report);
  await up(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report._id });
  expect(updatedReport).toHaveProperty('author', user._id);
  expect(updatedReport).not.toHaveProperty('scout');
});

test('down function should set report author field to scout field', async () => {
  const player = buildPlayer();
  await testDB.collection('players').insertOne(player);

  const user = buildUser();
  await testDB.collection('users').insertOne(user);

  const report = buildReport({ player: player._id, author: user._id });
  await testDB.collection('reports').insertOne(report);
  await down(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report._id });
  expect(updatedReport).toHaveProperty('scout', user._id);
  expect(updatedReport).not.toHaveProperty('author');
});
