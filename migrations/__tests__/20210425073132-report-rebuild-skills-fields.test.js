const { config, database } = require('migrate-mongo');
const testConfig = require('../config/testConfig');
const { buildPlayer, buildOldReport, buildReport } = require('../../test/utils');
const { up, down } = require('../20210425073132-report-rebuild-skills-fields');

function getOldSkillsNotesObject(skills) {
  return Object.entries(skills).map(([key, value]) => ({
    name: key,
    description: value.note,
  }));
}

function getNotesObjectFromSkillsArray(skillsArray) {
  return skillsArray.map(({ name, description }) => ({
    name,
    description,
  }));
}

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

test('up function should add skills array based on individualSkills, teamplaySkills and motorSkills fields', async () => {
  const player1 = buildPlayer();
  await testDB.collection('players').insertOne(player1);

  const report1 = buildOldReport({ player: player1._id });
  await testDB.collection('reports').insertOne(report1);

  await up(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report1._id });

  expect(updatedReport).toHaveProperty('skills');
  expect(updatedReport.skills.length).toBe(12);
  expect(updatedReport.skills).toContainEqual({
    category: 'individual',
    name: 'ballReception',
    shortName: 'ball',
    hasScore: true,
    score: report1.individualSkills.ballReception.rating,
    description: report1.individualSkills.ballReception.note,
  });

  const oldSkillsNotes = [
    ...getOldSkillsNotesObject(updatedReport.individualSkills),
    ...getOldSkillsNotesObject(updatedReport.teamplaySkills),
    { name: 'leading', description: updatedReport.motorSkills.leading },
    { name: 'neglected', description: updatedReport.motorSkills.neglected },
  ];

  const newSkillsNotes = getNotesObjectFromSkillsArray(updatedReport.skills);

  const matches = oldSkillsNotes.map((skill) => {
    const newSkill = newSkillsNotes.find((item) => item.name === skill.name);
    return skill.name === newSkill.name;
  });

  expect(newSkillsNotes.length).toBe(oldSkillsNotes.length);
  expect(matches).not.toContain(false);
});

test('down function should unset skills field', async () => {
  const player1 = buildPlayer();
  await testDB.collection('players').insertOne(player1);

  const report1 = buildReport({ player: player1._id });
  await testDB.collection('reports').insertOne(report1);
  await down(testDB);

  const updatedReport = await testDB.collection('reports').findOne({ _id: report1._id });
  expect(updatedReport).not.toHaveProperty('skills');
});
