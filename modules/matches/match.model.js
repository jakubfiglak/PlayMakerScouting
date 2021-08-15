const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('@meanie/mongoose-to-json');
const autoPopulate = require('mongoose-autopopulate');
const options = require('./options');
const { competitions } = require('../../utils/data');

const { Schema, model } = mongoose;

const MatchSchema = new Schema(
  {
    homeTeam: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: 'Please add a home team',
      autopopulate: { select: options.select.club },
    },
    awayTeam: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: 'Please add a home team',
      autopopulate: { select: options.select.club },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add an author',
    },
    competition: {
      type: String,
      enum: competitions,
    },
    date: {
      type: Date,
      required: 'Please add a date',
    },
    result: {
      type: String,
      trim: true,
    },
    videoURL: {
      type: String,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

MatchSchema.plugin(mongoosePaginate);
MatchSchema.plugin(autoPopulate);
MatchSchema.plugin(toJson);

module.exports = model('Match', MatchSchema);
