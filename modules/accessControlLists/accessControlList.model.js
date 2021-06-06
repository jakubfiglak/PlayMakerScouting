const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const autoPopulate = require('mongoose-autopopulate');
const options = require('./options');

const { Schema, model } = mongoose;

const AccessControlListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
      autopopulate: options.select.user,
    },
    team: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Team',
      autopopulate: options.select.team,
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
  },
  { timestamps: true }
);

AccessControlListSchema.plugin(toJson);
AccessControlListSchema.plugin(autoPopulate);

module.exports = model('AccessControlList', AccessControlListSchema);
