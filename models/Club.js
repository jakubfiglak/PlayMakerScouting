const mongoose = require('mongoose');
const geocode = require('../middleware/geocode');
const AddressSchema = require('../schemas/Address');

const { Schema, model } = mongoose;

const ClubSchema = new Schema({
  name: {
    type: String,
    required: 'please add club name',
    trim: true,
    unique: true,
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

ClubSchema.pre('save', geocode);

module.exports = model('Club', ClubSchema);
