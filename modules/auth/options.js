const monthInMilliseconds = 30 * 1000 * 60 * 60 * 24;

const options = {
  cookies: {
    httpOnly: true,
    expires: new Date(Date.now() + monthInMilliseconds),
  },
  forbiddenUpdates: [
    'email',
    'password',
    'role',
    'status',
    'confirmationCode',
    'resetPasswordToken',
    'resetPasswordExpires',
    'createdAt',
    'updatedAt',
  ],
};

module.exports = options;
