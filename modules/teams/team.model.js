const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

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
    },
  },
  { timestamps: true }
);

TeamSchema.plugin(toJson);

module.exports = model('Team', TeamSchema);
