const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const { Schema, model } = mongoose;

const ReportTemplateSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      trim: true,
      required: 'Please add a name',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add an author',
    },
    ratings: {
      type: [Schema.Types.ObjectId],
      ref: 'Rating',
      default: [],
    },
    maxRatingScore: {
      type: Number,
      default: 4,
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ReportTemplateSchema.plugin(toJson);

module.exports = model('ReportTemplate', ReportTemplateSchema);
