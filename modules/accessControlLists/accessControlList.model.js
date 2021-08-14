const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const autoPopulate = require('mongoose-autopopulate');
const options = require('./options');

const { Schema, model } = mongoose;

const AccessControlListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      index: {
        unique: true,
        partialFilterExpression: { user: { $type: 'objectId' } },
      },
      ref: 'User',
      autopopulate: { select: options.select.user },
    },
    team: {
      type: Schema.Types.ObjectId,
      index: {
        unique: true,
        partialFilterExpression: { team: { $type: 'objectId' } },
      },
      ref: 'Team',
      autopopulate: { select: options.select.team },
    },
    players: {
      type: [Schema.Types.ObjectId],
      ref: 'Player',
      default: [],
    },
    clubs: {
      type: [Schema.Types.ObjectId],
      ref: 'Club',
      default: [],
    },
    reports: {
      type: [Schema.Types.ObjectId],
      ref: 'Report',
      default: [],
    },
    matches: {
      type: [Schema.Types.ObjectId],
      ref: 'Match',
      default: [],
    },
    notes: {
      type: [Schema.Types.ObjectId],
      ref: 'Note',
      default: [],
    },
    reportBackgroundImages: {
      type: [Schema.Types.ObjectId],
      ref: 'ReportBackgroundImage',
      default: [],
    },
  },
  { timestamps: true }
);

AccessControlListSchema.plugin(toJson);
AccessControlListSchema.plugin(autoPopulate);

module.exports = model('AccessControlList', AccessControlListSchema);
