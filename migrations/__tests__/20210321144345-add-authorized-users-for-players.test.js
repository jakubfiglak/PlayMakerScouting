const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildUser } = require('../../test/utils');
const {
  up,
  down,
} = require('../20210321144345-add-authorized-users-for-players');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('players').deleteMany();
  await testDB.collection('users').deleteMany();
});

test('up function should remove myPlayers prop from users models and add authorizedUsers prop to players models with corresponding users ids', async () => {
  const player = buildPlayer({ _id: 'TEST-PLAYER-ID' });
  await testDB.collection('players').insertOne(player);
  const user1 = buildUser({
    _id: 'USER-TEST-ID1',
    myPlayers: ['TEST-PLAYER-ID'],
  });
  const user2 = buildUser({
    _id: 'USER-TEST-ID2',
    myPlayers: ['TEST-PLAYER-ID'],
  });
  await testDB.collection('users').insertMany([user1, user2]);

  await up(testDB);

  const updatedPlayer = await testDB
    .collection('players')
    .findOne({ _id: player._id });

  expect(updatedPlayer).toHaveProperty('authorizedUsers');
  expect(updatedPlayer.authorizedUsers).toContain(user1._id);
  expect(updatedPlayer.authorizedUsers).toContain(user2._id);

  const updatedUsers = await testDB.collection('users').find().toArray();
  expect(updatedUsers[0]).not.toHaveProperty('myPlayers');
  expect(updatedUsers[1]).not.toHaveProperty('myPlayers');
});

test('down function should remove authorizedUsers prop from players models and add myPlayers prop to users models with corresponding clubs ids', async () => {
  const player = buildPlayer({
    _id: 'TEST-PLAYER-ID',
    authorizedUsers: ['USER-TEST-ID1', 'USER-TEST-ID2'],
  });
  await testDB.collection('players').insertOne(player);
  const user1 = buildUser({ _id: 'USER-TEST-ID1' });
  const user2 = buildUser({ _id: 'USER-TEST-ID2' });
  await testDB.collection('users').insertMany([user1, user2]);

  await down(testDB);

  const updatedPlayer = await testDB
    .collection('players')
    .findOne({ _id: player._id });
  expect(updatedPlayer).not.toHaveProperty('authorizedUsers');

  const updatedUsers = await testDB.collection('users').find().toArray();
  expect(updatedUsers[0]).toHaveProperty('myPlayers');
  expect(updatedUsers[0].myPlayers).toContain('TEST-PLAYER-ID');
  expect(updatedUsers[1]).toHaveProperty('myPlayers');
  expect(updatedUsers[1].myPlayers).toContain('TEST-PLAYER-ID');
});
