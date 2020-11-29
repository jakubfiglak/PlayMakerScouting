const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const calculateReportAvg = require('../middleware/calculateReportAvg');

const { Schema, model } = mongoose;

const ratingType = {
  rating: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  note: {
    type: String,
    trim: true,
    maxlength: 400,
  },
};

const ReportSchema = new Schema({
  player: {
    type: Schema.ObjectId,
    ref: 'Player',
    required: 'Please add a player',
  },
  scout: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please add a scout',
  },
  order: {
    type: Schema.ObjectId,
    ref: 'Order',
  },
  match: {
    location: {
      type: String,
      enum: ['home', 'away'],
    },
    against: {
      type: String,
    },
    competition: {
      type: String,
      enum: ['league', 'cup', 'friendly'],
    },
  },
  minutesPlayed: {
    type: Number,
    min: 0,
    max: 90,
  },
  goals: {
    type: Number,
    min: 0,
  },
  assists: {
    type: Number,
    min: 0,
  },
  yellowCards: {
    type: Number,
    enum: [0, 1, 2],
  },
  redCards: {
    type: Number,
    enum: [0, 1],
  },
  individualSkills: {
    ballReception: ratingType,
    passing: ratingType,
    defOneOnOne: ratingType,
    airPlay: ratingType,
    positioning: ratingType,
    attOneOnOne: ratingType,
    finishing: ratingType,
  },
  teamplaySkills: {
    attack: ratingType,
    defense: ratingType,
    transition: ratingType,
  },
  motorSkills: {
    leading: String,
    neglected: String,
  },
  finalRating: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  summary: {
    type: String,
    trim: true,
  },
  individualAvg: {
    type: Number,
  },
  teamplayAvg: {
    type: Number,
  },
  avgRating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReportSchema.plugin(mongoosePaginate);

ReportSchema.pre('save', calculateReportAvg);

module.exports = model('Report', ReportSchema);
