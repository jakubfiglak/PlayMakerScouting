const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const { Schema, model } = mongoose;

const RatingSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: 'Please add an author',
    },
    category: {
      type: String,
      enum: ['individual', 'teamplay', 'offense', 'defense', 'physical', 'mental'],
      required: 'Please add rating category',
    },
    name: {
      type: String,
      maxlength: 30,
      trim: true,
      required: 'Please add rating name',
    },
    shortName: {
      type: String,
      maxlength: 4,
      trim: true,
      required: 'Please add rating short name',
    },
    private: {
      type: Boolean,
      default: true,
    },
    score: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

RatingSchema.plugin(toJson);

module.exports = model('Rating', RatingSchema);
