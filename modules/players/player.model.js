const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('@meanie/mongoose-to-json');
const { positions, userRoles } = require('../../utils/data');

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
      type: Schema.Types.ObjectId,
      ref: 'Club',
    },
    position: {
      type: String,
      required: 'Please choose a position',
      enum: positions,
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
      trim: true,
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
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add an author',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isSeededFromPlaymakerDb: {
      type: Boolean,
      default: false,
    },
    createdByUserWithRole: {
      type: String,
      enum: userRoles,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PlayerSchema.plugin(mongoosePaginate);
PlayerSchema.plugin(toJson);

PlayerSchema.virtual('reportsCount', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'player',
  justOne: false,
  count: true,
});
PlayerSchema.virtual('notesCount', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'player',
  justOne: false,
  count: true,
});

module.exports = model('Player', PlayerSchema);
