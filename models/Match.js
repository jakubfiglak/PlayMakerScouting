const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const MatchSchema = new Schema({
  homeTeam: {
    type: Schema.ObjectId,
    ref: 'Club',
    required: 'Please add home team',
  },
  awayTeam: {
    type: Schema.ObjectId,
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

MatchSchema.plugin(mongoosePaginate);

module.exports = model('Match', MatchSchema);
