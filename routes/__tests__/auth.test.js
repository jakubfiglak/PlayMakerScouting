const axios = require('axios').default;
const httpStatus = require('http-status');
const startServer = require('../../start');
const setupTestDB = require('../../test/setupTestDB');
const {
  buildUser,
  buildRegisterForm,
  buildLoginForm,
} = require('../../test/utils');
const { insertUsers, insertTestUser } = require('../../test/db-utils');
const emailService = require('../../services/email.service');
const User = require('../../models/user.model');

jest.mock('../../services/email.service.js');

emailService.sendEmail.mockImplementation((data) => data);

let api = axios.create();
let server;

setupTestDB();

beforeAll(async () => {
  server = await startServer();
  const baseURL = `http://localhost:${server.address().port}/api/v1`;
  api = axios.create({ baseURL });
});

afterAll(() => server.close());

describe('POST api/v1/auth/register', () => {
  it('should return 400 error if email is already taken', async () => {
    const existingUser = buildUser({ email: 'already-taken@example.com' });
    await insertUsers([existingUser]);

    const newUserRegisterData = buildRegisterForm({
      email: 'already-taken@example.com',
    });

    const { response } = await api
      .post('auth/register', newUserRegisterData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"User already exists"');
  });

  it('should return 400 error if passwords do not match', async () => {
    const registerData = buildRegisterForm({
      password: 'SOME-PASSWORD',
      passwordConfirm: 'SOME-OTHER-PASSWORD',
    });

    const { response } = await api
      .post('auth/register', registerData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Passwords do not match"'
    );
  });

  it('should return 201 status and the user object, send a confirmation email and successfully save the user to the database if request data is valid', async () => {
    const registerData = buildRegisterForm();

    const response = await api.post('auth/register', registerData);

    expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(emailService.sendEmail.mock.calls[0][0]).toHaveProperty(
      'to',
      registerData.email
    );
    expect(
      emailService.sendEmail.mock.calls[0][0].subject
    ).toMatchInlineSnapshot(
      '"Aktywuj swoje konto w aplikacji PlaymakerPro Scouting"'
    );
    expect(emailService.sendEmail.mock.calls[0][0]).toHaveProperty('text');
    expect(emailService.sendEmail.mock.calls[0][0]).toHaveProperty('html');

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot(
      '"Successfully created new user!"'
    );
    expect(response.data.data).not.toHaveProperty('password');
    expect(response.data.data).toMatchObject({
      id: expect.anything(),
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email.toLowerCase(),
      role: 'scout',
      status: 'pending',
      confirmationCode: expect.anything(),
    });

    const dbUser = await User.findById(response.data.data.id);

    expect(dbUser).toBeDefined();
  });
});

describe('GET api/v1/auth/confirm/:confirmationCode', () => {
  it("should return 404 error if the user with the given confirmation code doesn't exist", async () => {
    const { response } = await api
      .get('auth/confirm/FAKE-CODE')
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"User not found"');
  });

  it('should return 200 status and the user object if confirmation code is valid', async () => {
    const user = buildUser({ confirmationCode: 'TEST-CODE' });
    await insertUsers([user]);

    const response = await api.get(`auth/confirm/${user.confirmationCode}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot(
      '"Account activated successfully, you can now log in to the app!"'
    );
    expect(response.data.data).not.toHaveProperty('confirmationCode');
    expect(response.data.data).toHaveProperty('status', 'active');
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return 400 error if email is not provided', async () => {
    const loginData = buildLoginForm({ email: '' });

    const { response } = await api
      .post('auth/login', loginData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Please provide an email and a password"'
    );
  });

  it('should return 400 error if password is not provided', async () => {
    const loginData = buildLoginForm({ password: '' });

    const { response } = await api
      .post('auth/login', loginData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Please provide an email and a password"'
    );
  });

  it("should return 401 error if user doesn't exist", async () => {
    const loginData = buildLoginForm();

    const { response } = await api
      .post('auth/login', loginData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"Invalid credentials"');
  });

  it("should return 401 error if user status is other than 'active'", async () => {
    const user = buildUser({ status: 'pending' });

    await insertUsers([user]);
    const loginData = buildLoginForm({
      email: user.email,
      password: user.password,
    });

    const { response } = await api
      .post('auth/login', loginData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot(
      '"Your account is not active, please verify your email"'
    );
  });

  it("should return 401 error if user status is other than 'active'", async () => {
    const user = buildUser({ password: 'SoMe-PASSWORD123' });

    await insertUsers([user]);
    const loginData = buildLoginForm({
      email: user.email,
      password: 'SOME-OTHER-PASSWORD',
    });

    const { response } = await api
      .post('auth/login', loginData)
      .catch((e) => e);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toMatchInlineSnapshot('"Invalid credentials"');
  });

  it('should return 200 status, login the user and set a cookie if the data is valid', async () => {
    const user = buildUser();

    await insertUsers([user]);
    const loginData = buildLoginForm({
      email: user.email,
      password: user.password,
    });

    const response = await api.post('auth/login', loginData);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toMatchInlineSnapshot('"Login success!"');

    expect(response.data.data.user).toMatchObject({ email: loginData.email });
    expect(response.data.data.expiresAt).toBeDefined();
    expect(response.headers['set-cookie'][0]).toBeDefined();
    expect(response.headers['set-cookie'][0]).toContain('token');
  });
});

describe('GET api/v1/auth/account', () => {
  it('should do something', async () => {
    const { user, token } = await insertTestUser();
    console.log(user);
    console.log(token);

    const response = await api.get('/auth/account', {
      headers: { Cookie: 'asdasdasd' },
    });
    console.log(response);
  });
});
