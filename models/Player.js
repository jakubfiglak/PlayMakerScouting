const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please supply a First Name',
    trim: true,
  },
  lastName: {
    type: String,
    required: 'Please supply a Last Name',
    trim: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
  },
  position: {
    type: String,
    required: 'Please choose a position',
    enum: ['GK', 'D', 'M', 'F'],
  },
  DateOfBirth: {
    type: Date,
    required: 'Please enter a date of birth',
  },
  height: {
    type: Number,
    required: 'Please enter Your height',
  },
  weight: {
    type: Number,
    required: 'Please enter Your weight',
  },
  preferredLeg: {
    type: String,
    required: 'Please choose Your preferred leg',
    enum: ['L', 'R'],
  },
});

module.exports = model('Player', PlayerSchema);
