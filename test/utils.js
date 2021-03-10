const faker = require('faker');

const getFirstName = faker.name.firstName;
const getLastName = faker.name.lastName;
const getEmail = faker.internet.email;
const getPassword = faker.internet.password;

const buildUser = (overrides = {}) => ({
  firstName: getFirstName(),
  lastName: getLastName(),
  email: getEmail(),
  password: getPassword(),
  role: 'scout',
  status: 'active',
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

module.exports = { buildUser, buildReq, buildRes, buildNext };
