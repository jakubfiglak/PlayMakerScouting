const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const MatchSchema = new Schema({
  homeTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club',
    required: 'Please add home team',
  },
  awayTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club',
    required: 'Please add away team',
  },
  competition: {
    type: String,
    enum: ['league', 'cup', 'friendly'],
    required: 'Please add competition type',
  },
  date: {
    type: Date,
    required: 'Please add a date',
  },
});

module.exports = model('Match', MatchSchema);
