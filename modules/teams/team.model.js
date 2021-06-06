const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const autoPopulate = require('mongoose-autopopulate');

const { Schema, model } = mongoose;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      trim: true,
      required: 'Please add a team name',
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
      autopopulate: true,
    },
  },
  { timestamps: true }
);

TeamSchema.plugin(toJson);
TeamSchema.plugin(autoPopulate);

module.exports = model('Team', TeamSchema);
