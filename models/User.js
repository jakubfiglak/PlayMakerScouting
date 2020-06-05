const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const geocoder = require('../utils/geocoder');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Proszę podać imię',
    trim: true,
  },
  surname: {
    type: String,
    required: 'Proszę podać nazwisko',
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Adres email jest niepoprawny'],
    required: 'Proszę podać adres email',
  },
  phone: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'Numer telefonu jest niepoprawny'],
  },
  address: {
    type: String,
    required: 'Proszę podać adres',
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
    formattedAddress: String,
    street: String,
    city: String,
    voivodeship: String,
    zipcode: String,
  },
  activeRadius: {
    type: Number,
    required: 'Proszę podać maksymalny zasięg działania w km',
  },
  password: {
    type: String,
    required: 'Proszę podać hasło',
    minlength: [6, 'Hasło musi zawierać co najmniej 6 znaków'],
    match: [
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę oraz jedna cyfrę',
    ],
    select: false,
  },
  role: {
    type: String,
    default: 'scout',
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

// Geocode & create location field
UserSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    voivodeship: loc[0].stateCode,
    zipcode: loc[0].zipcode,
  };

  this.address = undefined;

  next();
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
