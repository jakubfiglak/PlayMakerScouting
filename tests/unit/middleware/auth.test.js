const mongoose = require('mongoose');
const User = require('../../../models/User');
const { protect } = require('../../../middleware/auth');

describe('routes protection', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      role: 'user',
    };
    const token = new User(user).getJwt();
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();

    protect(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
