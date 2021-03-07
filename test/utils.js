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

module.exports = { buildUser };
