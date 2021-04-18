const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('@meanie/mongoose-to-json');

const { Schema, model } = mongoose;

const PlayerSchema = new Schema(
  {
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
      type: Schema.ObjectId,
      ref: 'Club',
    },
    position: {
      type: String,
      required: 'Please choose a position',
      enum: ['GK', 'FB', 'CB', 'CM', 'WM', 'F'],
    },
    yearOfBirth: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    footed: {
      type: String,
      enum: ['L', 'R', 'both'],
    },
    lnpID: {
      type: String,
    },
    lnpProfileURL: {
      type: String,
    },
    minut90ProfileURL: {
      type: String,
    },
    transfermarktProfileURL: {
      type: String,
    },
    authorizedUsers: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

PlayerSchema.plugin(mongoosePaginate);
PlayerSchema.plugin(toJson);

module.exports = model('Player', PlayerSchema);
