const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildOldReport, buildClub, buildReport } = require('../../test/utils');
const { up, down } = require('../20210422201439-report-add-current-club');

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

test('up function should add players current club field based on aggregated player field', async () => {
  const club1 = buildClub();
  const club2 = buildClub();
  await testDB.collection('clubs').insertMany([club1, club2]);

  const player1 = buildPlayer({ club: club1._id });
  const player2 = buildPlayer({ club: club1._id });
  const player3 = buildPlayer({ club: club2._id });
  await testDB.collection('players').insertMany([player1, player2, player3]);

  const report1 = buildOldReport({ player: player1._id });
  const report2 = buildOldReport({ player: player2._id });
  const report3 = buildOldReport({ player: player3._id });
  await testDB.collection('reports').insertMany([report1, report2, report3]);

  await up(testDB);

  const updatedReports = await testDB.collection('reports').find().toArray();

  expect(updatedReports[0]).toHaveProperty('playerCurrentClub', club1._id);
  expect(updatedReports[1]).toHaveProperty('playerCurrentClub', club1._id);
  expect(updatedReports[2]).toHaveProperty('playerCurrentClub', club2._id);
});

test('down function should unset players current club field', async () => {
  const club1 = buildClub();
  const club2 = buildClub();
  await testDB.collection('clubs').insertMany([club1, club2]);

  const player1 = buildPlayer({ club: club1._id });
  const player2 = buildPlayer({ club: club1._id });
  const player3 = buildPlayer({ club: club2._id });
  await testDB.collection('players').insertMany([player1, player2, player3]);

  const report1 = buildReport({ player: player1._id });
  const report2 = buildReport({ player: player2._id });
  const report3 = buildReport({ player: player3._id });
  await testDB.collection('reports').insertMany([report1, report2, report3]);

  await down(testDB);

  const updatedReports = await testDB.collection('reports').find().toArray();

  expect(updatedReports[0]).not.toHaveProperty('playerCurrentClub');
  expect(updatedReports[1]).not.toHaveProperty('playerCurrentClub');
  expect(updatedReports[2]).not.toHaveProperty('playerCurrentClub');
});
