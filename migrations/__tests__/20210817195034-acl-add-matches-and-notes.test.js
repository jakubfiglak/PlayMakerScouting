const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { ID } = require('../../test/utils');
const { up, down } = require('../20210817195034-acl-add-matches-and-notes');

let testDB;

beforeAll(async () => {
  config.set(testConfig);
  const { db } = await database.connect();
  testDB = db;
});

beforeEach(async () => {
  await testDB.collection('accesscontrollists').deleteMany();
});

test('up function should set matches and notes fields on ACL documents', async () => {
  const acl = {
    _id: new ID(),
    user: null,
    team: null,
    players: [],
    clubs: [],
    reports: [],
  };
  await testDB.collection('accesscontrollists').insertOne(acl);

  await up(testDB);

  const updatedAcl = await testDB.collection('accesscontrollists').findOne({ _id: acl._id });
  expect(updatedAcl).toHaveProperty('matches', []);
  expect(updatedAcl).toHaveProperty('notes', []);
});

test('down function should unset matches and notes fields on ACL documents', async () => {
  const acl = {
    _id: new ID(),
    user: null,
    team: null,
    players: [],
    clubs: [],
    reports: [],
    matches: [],
    notes: [],
  };
  await testDB.collection('accesscontrollists').insertOne(acl);

  await down(testDB);

  const updatedAcl = await testDB.collection('accesscontrollists').findOne({ _id: acl._id });
  // console.log(updatedAcl);
  expect(updatedAcl).not.toHaveProperty('matches');
  expect(updatedAcl).not.toHaveProperty('notes');
});
