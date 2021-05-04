const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const { ratingCategories } = require('../../utils/data');

const { Schema, model } = mongoose;

const RatingSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add an author',
    },
    category: {
      type: String,
      enum: ratingCategories,
      required: 'Please add rating category',
    },
    name: {
      type: String,
      maxlength: 30,
      trim: true,
      required: 'Please add rating name',
      unqiue: true,
    },
    shortName: {
      type: String,
      maxlength: 6,
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
