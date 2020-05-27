const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid email address'],
    required: 'Please supply email address',
  },
  password: {
    type: String,
    required: 'Please supply a password',
    minlength: [6, 'Password has to be min 6 chars long'],
    match: [
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Password has to contain at least 1 lowercase letter, at least 1 uppercase letter and at least 1 numeric character',
    ],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt the password before each model save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Get JWT token
UserSchema.methods.getJwt = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Password comparison
UserSchema.methods.comparePasswords = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = model('User', UserSchema);
