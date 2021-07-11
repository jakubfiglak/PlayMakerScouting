const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildUser, buildClub, buildPlayer, buildReport } = require('../../test/utils');
const { up } = require('../20210610192038-create-access-control-lists');

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
  await testDB.collection('accesscontrollists').deleteMany();
});

test('up function should create ACLs for all non-admin users', async () => {
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

  const acls = await testDB.collection('accesscontrollists').find().toArray();

  expect(acls.length).toBe(2);
  expect(acls[0].user.toHexString()).toBe(user1._id.toHexString());
  expect(acls[0].clubs.length).toBe(1);
  expect(acls[0].clubs).toContainEqual(club1._id);
  expect(acls[0].players.length).toBe(1);
  expect(acls[0].players).toContainEqual(player1._id);
  expect(acls[0].reports.length).toBe(1);
  expect(acls[0].reports).toContainEqual(report1._id);
  expect(acls[1].user.toHexString()).toBe(user2._id.toHexString());
  expect(acls[1].clubs.length).toBe(2);
  expect(acls[1].clubs).toContainEqual(club1._id);
  expect(acls[1].clubs).toContainEqual(club2._id);
  expect(acls[1].players.length).toBe(2);
  expect(acls[1].players).toContainEqual(player1._id);
  expect(acls[1].players).toContainEqual(player2._id);
  expect(acls[1].reports.length).toBe(1);
  expect(acls[1].reports).toContainEqual(report2._id);
});
