const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please add a first Name',
    trim: true,
  },
  lastName: {
    type: String,
    required: 'Please add a last Name',
    trim: true,
  },
  club: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club',
  },
  position: {
    type: String,
    required: 'Please choose a position',
    enum: ['GK', 'D', 'M', 'F'],
  },
  DateOfBirth: {
    type: Date,
    required: 'Please add a date of birth',
  },
  height: {
    type: Number,
    required: 'Please enter players height [cm]',
  },
  weight: {
    type: Number,
    required: 'Please enter players weight [kg]',
  },
  preferredLeg: {
    type: String,
    required: 'Please choose players preferred leg',
    enum: ['L', 'R'],
  },
});

module.exports = model('Player', PlayerSchema);
