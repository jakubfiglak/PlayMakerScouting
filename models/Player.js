const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PlayerSchema.plugin(mongoosePaginate);

PlayerSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'player',
  justOne: false,
});

module.exports = model('Player', PlayerSchema);
