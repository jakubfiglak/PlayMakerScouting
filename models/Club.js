const mongoose = require('mongoose');
const geocode = require('../middleware/geocode');

const { Schema, model } = mongoose;

const ClubSchema = new Schema({
  name: {
    type: String,
    required: 'please add club name',
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    required: 'please add an address',
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
  division: {
    type: String,
    enum: [
      'Ekstraklasa',
      'I liga',
      'II liga',
      'III liga',
      'IV liga',
      'Klasa okręgowa',
      'Klasa A',
      'Klasa B',
      'Klasa C',
    ],
    required: 'please add clubs current division',
  },
});

// Geocode & create location field
ClubSchema.pre('save', geocode);

module.exports = model('Club', ClubSchema);
