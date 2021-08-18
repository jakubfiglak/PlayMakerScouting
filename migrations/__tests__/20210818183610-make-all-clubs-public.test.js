const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildClub } = require('../../test/utils');
const { up, down } = require('../20210818183610-make-all-clubs-public');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('clubs').deleteMany();
});

test('up function should set all clubs isPublic field to true', async () => {
  const club1 = buildClub({ isPublic: false });
  const club2 = buildClub({ isPublic: false });
  await testDB.collection('clubs').insertMany([club1, club2]);

  await up(testDB);

  const updatedClubs = await testDB.collection('clubs').find({}).toArray();
  expect(updatedClubs[0].isPublic).toBe(true);
  expect(updatedClubs[1].isPublic).toBe(true);
});

test('down function should set all clubs isPublic field to false', async () => {
  const club1 = buildClub({ isPublic: true });
  const club2 = buildClub({ isPublic: true });
  await testDB.collection('clubs').insertMany([club1, club2]);

  await down(testDB);

  const updatedClubs = await testDB.collection('clubs').find({}).toArray();
  expect(updatedClubs[0].isPublic).toBe(false);
  expect(updatedClubs[1].isPublic).toBe(false);
});
