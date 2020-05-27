const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../../../models/User');

dotenv.config({
  path: '../../config/config.env',
});

describe('user.getJwt', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User(payload);
    const token = user.getJwt();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toMatchObject(payload);
  });
});

describe('user.comparePasswords', () => {
  const user = new User({
    _id: new mongoose.Types.ObjectId().toHexString(),
    password: 'password',
  });

  it('returns false if passwords do not match', async () => {
    const match = await user.comparePasswords('different password');
    expect(match).toBe(false);
  });

  it('returns true if passwords match', async () => {
    const match = await user.comparePasswords('password');
    expect(match).toBe(false);
  });
});
