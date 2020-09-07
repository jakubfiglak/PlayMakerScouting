const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const geocode = require('../middleware/geocode');
const AddressSchema = require('../schemas/Address');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'please add a name',
    trim: true,
  },
  surname: {
    type: String,
    required: 'please add a surname',
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'email address is not valid'],
    required: 'please add an email address',
  },
  phone: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'phone number is not valid'],
  },
  address: {
    type: AddressSchema,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  activeRadius: {
    type: Number,
    required: 'please add max operating distance [km]',
  },
  password: {
    type: String,
    required: 'please add a password',
    minlength: [6, 'password must be at least 6 characters long'],
    match: [
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'password must contain at least 1 lowercase letter, 1 uppercase letter and 1 digit',
    ],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'playmaker-scout', 'scout'],
    default: 'scout',
  },
  myClubs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club',
    },
  ],
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

// Geocode & create location field
UserSchema.pre('save', geocode);

// Get JWT token
UserSchema.methods.getJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      activeRadius: this.activeRadius,
      coords: this.location.coordinates,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Password comparison
UserSchema.methods.comparePasswords = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = model('User', UserSchema);
