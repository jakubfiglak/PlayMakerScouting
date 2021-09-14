const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const autoPopulate = require('mongoose-autopopulate');
const options = require('./options');
const { userRoles } = require('../../utils/data');

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
      autopopulate: { select: options.select },
    },
    maxRatingScore: {
      type: Number,
      default: 4,
    },
    private: {
      type: Boolean,
      default: true,
    },
    createdByUserWithRole: {
      type: String,
      enum: userRoles,
    },
  },
  { timestamps: true }
);

ReportTemplateSchema.plugin(toJson);
ReportTemplateSchema.plugin(autoPopulate);

module.exports = model('ReportTemplate', ReportTemplateSchema);
