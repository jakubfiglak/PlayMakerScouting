const faker = require('faker');
const mongoose = require('mongoose');

const getFirstName = faker.name.firstName;
const getLastName = faker.name.lastName;
const getEmail = faker.internet.email;
const getPassword = faker.internet.password;

const password = `aB1${getPassword()}`;

const buildUser = (overrides = {}) => ({
  _id: new mongoose.Types.ObjectId(),
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
  _id: new mongoose.Types.ObjectId(),
  name: faker.company.companyName(),
  voivodeship: 'Wielkopolskie',
  division: 'Ekstraklasa',
  ...overrides,
});

const buildPlayer = (overrides = {}) => ({
  _id: new mongoose.Types.ObjectId(),
  firstName: getFirstName(),
  lastName: getLastName(),
  position: 'CM',
  ...overrides,
});

const buildOrder = (overrides = {}) => ({
  _id: new mongoose.Types.ObjectId(),
  status: 'open',
  ...overrides,
});

const buildReport = (overrides = {}) => ({
  _id: new mongoose.Types.ObjectId(),
  ...overrides,
});

const buildReq = (overrides = {}) => {
  const req = { body: {}, params: {}, ...overrides };
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
  buildReq,
  buildRes,
  buildNext,
};
