const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer } = require('../../test/utils');
const { up, down } = require('../20210418192815-expand-player-position-enum');
const { positions, oldPositions } = require('../../utils/data');

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

test('up function should properly assign new positions to all players', async () => {
  const players = oldPositions.map((position) => buildPlayer({ position }));

  await testDB.collection('players').insertMany(players);

  await up(testDB);

  const updatedPlayers = await testDB.collection('players').find().toArray();
  expect(updatedPlayers.length).toBe(oldPositions.length);
  expect(updatedPlayers[0].position).toBe('GK');
  expect(updatedPlayers[1].position).toBe('RB');
  expect(updatedPlayers[2].position).toBe('CB');
  expect(updatedPlayers[3].position).toBe('CM');
  expect(updatedPlayers[4].position).toBe('RW');
  expect(updatedPlayers[5].position).toBe('F');
});

test('down function should properly assign old positions to all players', async () => {
  const players = positions.map((position) => buildPlayer({ position }));

  await testDB.collection('players').insertMany(players);

  await down(testDB);

  const updatedPlayers = await testDB.collection('players').find().toArray();
  expect(updatedPlayers.length).toBe(positions.length);
  expect(updatedPlayers[0].position).toBe('GK');
  expect(updatedPlayers[1].position).toBe('FB');
  expect(updatedPlayers[2].position).toBe('FB');
  expect(updatedPlayers[3].position).toBe('CB');
  expect(updatedPlayers[4].position).toBe('WM');
  expect(updatedPlayers[5].position).toBe('FB');
  expect(updatedPlayers[6].position).toBe('WM');
  expect(updatedPlayers[7].position).toBe('FB');
  expect(updatedPlayers[8].position).toBe('CM');
  expect(updatedPlayers[9].position).toBe('CM');
  expect(updatedPlayers[10].position).toBe('CM');
  expect(updatedPlayers[11].position).toBe('F');
});
