const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildClub, buildUser } = require('../../test/utils');
const {
  up,
  down,
} = require('../20210316183335-add-authorized-users-for-clubs');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('clubs').deleteMany();
  await testDB.collection('users').deleteMany();
});

test('up function should remove myClubs prop from users models and add authorizedUsers prop to clubs models with corresponding users ids', async () => {
  const club = buildClub({ _id: 'TEST-CLUB-ID' });
  await testDB.collection('clubs').insertOne(club);
  const user1 = buildUser({ _id: 'USER-TEST-ID1', myClubs: ['TEST-CLUB-ID'] });
  const user2 = buildUser({ _id: 'USER-TEST-ID2', myClubs: ['TEST-CLUB-ID'] });
  await testDB.collection('users').insertMany([user1, user2]);

  await up(testDB);

  const updatedClub = await testDB
    .collection('clubs')
    .findOne({ _id: club._id });

  expect(updatedClub).toHaveProperty('authorizedUsers');
  expect(updatedClub.authorizedUsers).toContain(user1._id);
  expect(updatedClub.authorizedUsers).toContain(user2._id);

  const updatedUsers = await testDB.collection('users').find().toArray();
  expect(updatedUsers[0]).not.toHaveProperty('myClubs');
  expect(updatedUsers[1]).not.toHaveProperty('myClubs');
});

test('down function should remove authorizedUsers prop from clubs models and add myClubs prop to users models with corresponding clubs ids', async () => {
  const club = buildClub({
    _id: 'TEST-CLUB-ID',
    authorizedUsers: ['USER-TEST-ID1', 'USER-TEST-ID2'],
  });
  await testDB.collection('clubs').insertOne(club);
  const user1 = buildUser({ _id: 'USER-TEST-ID1' });
  const user2 = buildUser({ _id: 'USER-TEST-ID2' });
  await testDB.collection('users').insertMany([user1, user2]);

  await down(testDB);

  const updatedClub = await testDB
    .collection('clubs')
    .findOne({ _id: club._id });
  expect(updatedClub).not.toHaveProperty('authorizedUsers');

  const updatedUsers = await testDB.collection('users').find().toArray();
  expect(updatedUsers[0]).toHaveProperty('myClubs');
  expect(updatedUsers[0].myClubs).toContain('TEST-CLUB-ID');
  expect(updatedUsers[1]).toHaveProperty('myClubs');
  expect(updatedUsers[1].myClubs).toContain('TEST-CLUB-ID');
});
