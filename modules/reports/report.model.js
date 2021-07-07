const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const toJson = require('@meanie/mongoose-to-json');
const calculateReportAvg = require('../../middleware/calculateReportAvg');
const { ratingCategories, positions } = require('../../utils/data');

const { Schema, model } = mongoose;

const ReportSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: 'Please add a player',
    },
    scout: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Please add a scout',
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    playerCurrentClub: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: 'Please add players current club',
    },
    positionPlayed: {
      type: String,
      enum: positions,
      required: 'Please add a position player actually played at',
    },
    shirtNo: {
      type: Number,
    },
    match: {
      location: {
        type: String,
        enum: ['home', 'away'],
      },
      against: {
        type: String,
      },
      competition: {
        type: String,
        enum: ['league', 'cup', 'friendly'],
      },
      date: {
        type: Date,
      },
      result: {
        type: String,
      },
    },
    minutesPlayed: {
      type: Number,
      min: 0,
      max: 120,
    },
    goals: {
      type: Number,
      min: 0,
    },
    assists: {
      type: Number,
      min: 0,
    },
    yellowCards: {
      type: Number,
      enum: [0, 1, 2],
    },
    redCards: {
      type: Number,
      enum: [0, 1],
    },
    skills: {
      type: [
        {
          _id: false,
          category: {
            type: String,
            enum: ratingCategories,
            require: 'Please add rating category',
          },
          name: {
            type: String,
            maxlength: 30,
            trim: true,
            required: 'Please add rating name',
          },
          shortName: {
            type: String,
            maxlength: 6,
            trim: true,
            required: 'Please add rating short name',
          },
          hasScore: {
            type: Boolean,
            default: true,
          },
          score: {
            type: Number,
          },
          description: {
            type: String,
            maxlength: 400,
          },
        },
      ],
      default: [],
    },
    finalRating: {
      type: Number,
      required: 'Please add final rating',
    },
    summary: {
      type: String,
      trim: true,
      required: 'Please add report summary',
    },
    avgRating: {
      type: Number,
    },
    percentageRating: {
      type: Number,
    },
    maxRatingScore: {
      type: Number,
      default: 4,
    },
    status: {
      type: String,
      enum: ['in-prep', 'closed'],
      default: 'in-prep',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReportSchema.plugin(mongoosePaginate);
ReportSchema.plugin(AutoIncrement, { inc_field: 'reportNo', start_seq: 50 });
ReportSchema.plugin(toJson);

ReportSchema.virtual('docNumber').get(function () {
  const date = new Date(this.createdAt);
  return `${this.reportNo.toString().padStart(4, '0')}/${date.getFullYear()}`;
});

ReportSchema.pre('save', calculateReportAvg);

module.exports = model('Report', ReportSchema);
