const faker = require('faker');
const mongoose = require('mongoose');

const getFirstName = faker.name.firstName;
const getLastName = faker.name.lastName;
const getEmail = faker.internet.email;
const getPassword = faker.internet.password;
const getRandomWord = faker.random.word;
const ID = mongoose.Types.ObjectId;

const password = `aB1${getPassword()}`;

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
  name: faker.company.companyName(),
  voivodeship: 'Wielkopolskie',
  division: 'Ekstraklasa',
  ...overrides,
});

const buildPlayer = (overrides = {}) => ({
  _id: new ID(),
  firstName: getFirstName(),
  lastName: getLastName(),
  position: 'CM',
  ...overrides,
});

const buildOrder = (overrides = {}) => ({
  _id: new ID(),
  player: new ID(),
  status: 'open',
  orderNo: 1,
  ...overrides,
});

const buildReport = (overrides = {}) => ({
  _id: new ID(),
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
  buildReq,
  buildRes,
  buildNext,
};
