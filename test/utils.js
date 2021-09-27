const faker = require('faker');
const mongoose = require('mongoose');
const { ratingCategories, positions } = require('../utils/data');

const getFirstName = faker.name.firstName;
const getLastName = faker.name.lastName;
const getEmail = faker.internet.email;
const getPassword = faker.internet.password;
const getRandomWord = faker.random.word;
const getRandomText = faker.random.words;
const getRandomName = faker.company.companyName;
const getRandomUrl = faker.internet.url;
const ID = mongoose.Types.ObjectId;

const password = `aB1${getPassword()}`;

function getRandomArrayMember(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const buildUser = (overrides = {}) => ({
  _id: new ID(),
  firstName: getFirstName(),
  lastName: getLastName(),
  email: getEmail().toLowerCase(),
  password,
  role: 'scout',
  status: 'active',
  ...overrides,
});

const buildRegisterForm = (overrides = {}) => ({
  firstName: getFirstName(),
  lastName: getLastName(),
  email: getEmail().toLowerCase(),
  password,
  passwordConfirm: password,
  ...overrides,
});

const buildLoginForm = (overrides = {}) => ({
  email: getEmail().toLowerCase(),
  password,
  ...overrides,
});

const buildUpdatePasswordForm = (overrides = {}) => ({
  oldPassword: password,
  newPassword: password,
  newPasswordConfirm: password,
  ...overrides,
});

const buildClub = (overrides = {}) => ({
  _id: new ID(),
  name: getRandomName(),
  country: 'PL',
  voivodeship: 'Wielkopolskie',
  division: 'Ekstraklasa',
  author: new ID(),
  ...overrides,
});

const buildPlayer = (overrides = {}) => ({
  _id: new ID(),
  firstName: getFirstName(),
  lastName: getLastName(),
  country: 'PL',
  position: 'CM',
  author: new ID(),
  ...overrides,
});

const buildOrder = (overrides = {}) => ({
  _id: new ID(),
  player: new ID(),
  status: 'open',
  orderNo: 1,
  author: new ID(),
  ...overrides,
});

const buildOldReportRating = (overrides = {}) => ({
  rating: 3,
  note: getRandomText(10),
  ...overrides,
});

const buildOldReport = (overrides = {}) => ({
  _id: new ID(),
  player: new ID(),
  scout: new ID(),
  match: {
    location: 'home',
    against: getRandomName(),
    competition: 'league',
    date: new Date(),
  },
  minutesPlayed: 90,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  individualSkills: {
    ballReception: buildOldReportRating(),
    passing: buildOldReportRating(),
    defOneOnOne: buildOldReportRating(),
    airPlay: buildOldReportRating(),
    positioning: buildOldReportRating(),
    attOneOnOne: buildOldReportRating(),
    finishing: buildOldReportRating(),
  },
  teamplaySkills: {
    attack: buildOldReportRating(),
    defense: buildOldReportRating(),
    transition: buildOldReportRating(),
  },
  motorSkills: {
    leading: getRandomText(10),
    neglected: getRandomText(10),
  },
  finalRating: 3,
  summary: getRandomText(15),
  reportNo: 1,
  ...overrides,
});

const buildReportRating = (overrides = {}) => ({
  category: getRandomArrayMember(ratingCategories),
  name: getRandomWord(),
  shortName: 'ABC',
  score: 4,
  description: getRandomText(10),
  ...overrides,
});

const buildReport = (overrides = {}) => ({
  _id: new ID(),
  player: new ID(),
  author: new ID(),
  playerCurrentClub: new ID(),
  positionPlayed: getRandomArrayMember(positions),
  match: {
    location: 'home',
    against: getRandomName(),
    competition: 'league',
    date: new Date(),
    result: '1:1',
  },
  shirtNo: 11,
  minutesPlayed: 90,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  skills: [
    buildReportRating(),
    buildReportRating(),
    buildReportRating(),
    buildReportRating(),
    buildReportRating(),
    buildReportRating(),
    buildReportRating({ score: null }),
  ],
  finalRating: 3,
  summary: getRandomText(15),
  maxRatingScore: 4,
  reportNo: 1,
  ...overrides,
});

const buildRating = (overrides = {}) => ({
  _id: new ID(),
  author: new ID(),
  category: 'individual',
  name: getRandomWord(),
  shortName: 'ABC',
  ...overrides,
});

const buildReportTemplate = (overrides = {}) => ({
  _id: new ID(),
  name: getRandomWord(),
  author: new ID(),
  ...overrides,
});

const buildTeam = (overrides = {}) => ({
  _id: new ID(),
  name: getRandomName().slice(0, 30),
  ...overrides,
});

const buildAccessControlList = (overrides = {}) => ({
  _id: new ID(),
  user: null,
  team: null,
  players: [],
  clubs: [],
  reports: [],
  matches: [],
  notes: [],
  ...overrides,
});

const buildReportBackgroundImage = (overrides = {}) => ({
  _id: new ID(),
  name: getRandomName(),
  url: getRandomUrl(),
  ...overrides,
});

const buildGrantAccessForm = (overrides = {}) => ({
  targetAssetType: 'user',
  targetAssetId: new ID(),
  clubs: [],
  players: [],
  matches: [],
  notes: [],
  reports: [],
  ...overrides,
});

const buildMatch = (overrides = {}) => ({
  _id: new ID(),
  homeTeam: new ID(),
  awayTeam: new ID(),
  author: new ID(),
  competition: 'league',
  date: new Date(),
  result: '1:1',
  isPublic: false,
  ...overrides,
});

const buildNote = (overrides = {}) => ({
  _id: new ID(),
  player: new ID(),
  playerCurrentClub: new ID(),
  author: new ID(),
  match: new ID(),
  positionPlayed: getRandomArrayMember(positions),
  shirtNo: 11,
  text: getRandomText(10),
  maxRatingScore: 4,
  rating: 3,
  noteNo: 1,
  ...overrides,
});

const buildReq = (overrides = {}) => {
  const req = { body: {}, params: {}, query: {}, ...overrides };
  return req;
};

const buildRes = (overrides = {}) => {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
};

const buildNext = (impl) => jest.fn(impl).mockName('next');

module.exports = {
  ID,
  buildUser,
  buildRegisterForm,
  buildLoginForm,
  buildUpdatePasswordForm,
  buildClub,
  buildPlayer,
  buildOrder,
  buildReport,
  buildRating,
  buildReportTemplate,
  buildOldReport,
  buildTeam,
  buildAccessControlList,
  buildReportBackgroundImage,
  buildGrantAccessForm,
  buildMatch,
  buildNote,
  buildReq,
  buildRes,
  buildNext,
};
