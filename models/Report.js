const mongoose = require('mongoose');
const calculateReportAvg = require('../middleware/calculateReportAvg');

const { Schema, model } = mongoose;

const ratingType = {
  type: Number,
  enum: [1, 2, 3],
};

const ReportSchema = new Schema({
  player: {
    type: Schema.ObjectId,
    ref: 'Player',
    required: 'Please add a player',
  },
  match: {
    type: Schema.ObjectId,
    ref: 'Match',
    required: 'Please add a match',
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please add a scout',
  },
  order: {
    type: Schema.ObjectId,
    ref: 'Order',
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
  mental: {
    lostPossessionBeh: ratingType,
    teamCommunication: ratingType,
    failedActionBeh: ratingType,
    teammateFailedPlayBeh: ratingType,
    successfulActionBeh: ratingType,
    teammateSuccessfulPlayBeh: ratingType,
    refereeCallBeh: ratingType,
    opponentScoreBeh: ratingType,
    teammateScoreBeh: ratingType,
    playerScoreBeh: ratingType,
    decisionMaking: ratingType,
    playerWrongDecisionBeh: ratingType,
    fansCriticismBeh: ratingType,
    coachCriticismBeh: ratingType,
    diligence: ratingType,
    bravery: ratingType,
    creativity: ratingType,
    determination: ratingType,
    anticipation: ratingType,
    leadershipSkills: ratingType,
    ballReceivingAggression: ratingType,
    experience: ratingType,
    decisiveness: ratingType,
  },
  physical: {
    acceleration: ratingType,
    speed: ratingType,
    jumping: ratingType,
    stamina: ratingType,
    strength: ratingType,
    flexibility: ratingType,
    coordination: ratingType,
    reflex: ratingType,
  },
  footballSkills: {
    shortPass: ratingType,
    longPass: ratingType,
    throughPass: ratingType,
    shortPassWeakFoot: ratingType,
    longPassWeakFoot: ratingType,
    dribble: ratingType,
    headPlay: ratingType,
    covering: ratingType,
    oneOnOneDef: ratingType,
    oneOnOneAtt: ratingType,
    slidingTackle: ratingType,
    groundPassReception: ratingType,
    airPassReception: ratingType,
    setPieces: ratingType,
    crosses: ratingType,
    finishing: ratingType,
    finishingWeakFoot: ratingType,
    finishigHead: ratingType,
    offTheBall: ratingType,
    positioning: ratingType,
  },
  mentalAverage: {
    type: Number,
  },
  physicalAverage: {
    type: Number,
  },
  footballSkillsAverage: {
    type: Number,
  },
  averageRating: {
    type: Number,
  },
  note: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReportSchema.pre('save', calculateReportAvg);

module.exports = model('Report', ReportSchema);
