const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const autoPopulate = require('mongoose-autopopulate');
const toJson = require('@meanie/mongoose-to-json');
const options = require('./options');
const { positions } = require('../../utils/data');

const { Schema, model } = mongoose;

const NoteSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      autopopulate: { select: options.populate.player },
    },
    playerCurrentClub: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      autopopulate: { select: options.populate.club },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add an author',
      autopopulate: { select: options.populate.user },
    },
    match: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      autopopulate: true,
    },
    positionPlayed: {
      type: String,
      enum: positions,
    },
    shirtNo: { type: Number },
    text: {
      type: String,
      trim: true,
      required: 'Please add note text',
    },
    maxRatingScore: { type: Number },
    rating: { type: Number },
    percentageRating: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

NoteSchema.plugin(mongoosePaginate);
NoteSchema.plugin(autoPopulate);
NoteSchema.plugin(AutoIncrement, { inc_field: 'noteNo' });
NoteSchema.plugin(toJson);

NoteSchema.virtual('docNumber').get(function () {
  const date = new Date(this.createdAt);
  return `${this.noteNo.toString().padStart(5, '0')}/${date.getFullYear()}`;
});

NoteSchema.pre('save', function (next) {
  this.percentageRating = (this.rating / this.maxRatingScore) * 100;
  next();
});

module.exports = model('Note', NoteSchema);
