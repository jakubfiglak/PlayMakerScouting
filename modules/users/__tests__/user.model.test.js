const cases = require('jest-in-case');
const User = require('../user.model');
const { buildUser } = require('../../../test/utils');

it('should correctly validate a valid user', async () => {
  const newUser = buildUser();
  await expect(new User(newUser).validate()).resolves.toBeUndefined();
});

it('should throw a validation error if email is invalid', async () => {
  const newUser = buildUser({ email: 'INVALID_EMAIL' });
  await expect(new User(newUser).validate()).rejects.toThrow();
});

it('should throw a validation error if phone number is invalid', async () => {
  const newUser = buildUser({ phone: 'INVALID_PHONE_NUMBER' });
  await expect(new User(newUser).validate()).rejects.toThrow();
});

cases(
  'should throw a validation error if password is not strong enough',
  async ({ password }) => {
    const newUser = buildUser({ password });
    await expect(new User(newUser).validate()).rejects.toThrow();
  },
  {
    'too short': { password: 'AbC12' },
    'no lowercase letters': { password: 'ABC123456' },
    'no uppercase letters': { password: 'abc123456' },
    'no digits': { password: 'abcABC' },
  }
);

it('should throw a validation error if voivodeship name is not valid', async () => {
  const newUser = buildUser({ voivodeship: 'UNKNOWN_VOIVODESHIP' });
  await expect(new User(newUser).validate()).rejects.toThrow();
});

it('should throw a validation error if user role is not valid', async () => {
  const newUser = buildUser({ role: 'UNKNOWN_ROLE' });
  await expect(new User(newUser).validate()).rejects.toThrow();
});

it('should throw a validation error if user status is not valid', async () => {
  const newUser = buildUser({ status: 'UNKNOWN_STATUS' });
  await expect(new User(newUser).validate()).rejects.toThrow();
});
