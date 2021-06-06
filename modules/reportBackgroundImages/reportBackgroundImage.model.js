const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const { Schema, model } = mongoose;

const ReportBackgroundImageSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please add background image name',
      trim: true,
      unique: true,
    },
    url: {
      type: String,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ReportBackgroundImageSchema.plugin(toJson);

module.exports = model('ReportBackgroundImage', ReportBackgroundImageSchema);
