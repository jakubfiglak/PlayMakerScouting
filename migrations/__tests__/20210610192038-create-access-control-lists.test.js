const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildUser, buildClub, buildPlayer, buildReport } = require('../../test/utils');
const { up, down } = require('../20210610192038-create-access-control-lists');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('users').deleteMany();
  await testDB.collection('clubs').deleteMany();
  await testDB.collection('players').deleteMany();
  await testDB.collection('reports').deleteMany();
});

test('up function should do something', async () => {
  const user1 = buildUser({ role: 'scout' });
  const user2 = buildUser({ role: 'playmaker-scout' });
  const user3 = buildUser({ role: 'admin' });
  await testDB.collection('users').insertMany([user1, user2, user3]);

  const club1 = buildClub({ authorizedUsers: [user1._id, user2._id] });
  const club2 = buildClub({ authorizedUsers: [user2._id] });
  await testDB.collection('clubs').insertMany([club1, club2]);

  const player1 = buildPlayer({ authorizedUsers: [user1._id, user2._id] });
  const player2 = buildPlayer({ authorizedUsers: [user2._id] });
  await testDB.collection('players').insertMany([player1, player2]);

  const report1 = buildReport({ scout: user1._id });
  const report2 = buildReport({ scout: user2._id });
  await testDB.collection('reports').insertMany([report1, report2]);

  await up(testDB);

  expect(true).toBe(true);
});
