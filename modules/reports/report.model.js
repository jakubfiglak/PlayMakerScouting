const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const toJson = require('@meanie/mongoose-to-json');
const calculateReportAvg = require('../../middleware/calculateReportAvg');
const { ratingCategories, positions } = require('../../utils/data');

const { Schema, model } = mongoose;

// const ratingType = {
//   rating: {
//     type: Number,
//     enum: [1, 2, 3, 4],
//   },
//   note: {
//     type: String,
//     trim: true,
//     maxlength: 400,
//   },
// };

// const ReportSchema = new Schema(
//   {
//     player: {
//       type: Schema.Types.ObjectId,
//       ref: 'Player',
//       required: 'Please add a player',
//     },
//     scout: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: 'Please add a scout',
//     },
//     order: {
//       type: Schema.Types.ObjectId,
//       ref: 'Order',
//     },
//     match: {
//       location: {
//         type: String,
//         enum: ['home', 'away'],
//       },
//       against: {
//         type: String,
//       },
//       competition: {
//         type: String,
//         enum: ['league', 'cup', 'friendly'],
//       },
//       date: {
//         type: Date,
//       },
//     },
//     minutesPlayed: {
//       type: Number,
//       min: 0,
//       max: 90,
//     },
//     goals: {
//       type: Number,
//       min: 0,
//     },
//     assists: {
//       type: Number,
//       min: 0,
//     },
//     yellowCards: {
//       type: Number,
//       enum: [0, 1, 2],
//     },
//     redCards: {
//       type: Number,
//       enum: [0, 1],
//     },
//     individualSkills: {
//       ballReception: ratingType,
//       passing: ratingType,
//       defOneOnOne: ratingType,
//       airPlay: ratingType,
//       positioning: ratingType,
//       attOneOnOne: ratingType,
//       finishing: ratingType,
//     },
//     teamplaySkills: {
//       attack: ratingType,
//       defense: ratingType,
//       transition: ratingType,
//     },
//     motorSkills: {
//       leading: String,
//       neglected: String,
//     },
//     finalRating: {
//       type: Number,
//       enum: [1, 2, 3, 4],
//     },
//     summary: {
//       type: String,
//       trim: true,
//     },
//     individualAvg: {
//       type: Number,
//     },
//     teamplayAvg: {
//       type: Number,
//     },
//     avgRating: {
//       type: Number,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

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

/* Changes:
- add players current club field,
- add positionPlayed field,
- change minutesPlayed max value to 120
- remove individualSkills, teamplaySkills and motorSkills fields
- add skills field instead - array of ratings
- remove individualAvg and teamplayAvg fields
- add maxRatingScore field,
- add status field
*/

ReportSchema.plugin(mongoosePaginate);
ReportSchema.plugin(AutoIncrement, { inc_field: 'reportNo', start_seq: 50 });
ReportSchema.plugin(toJson);

ReportSchema.virtual('docNumber').get(function () {
  const date = new Date(this.createdAt);
  return `${this.reportNo.toString().padStart(4, '0')}/${date.getFullYear()}`;
});

// ReportSchema.pre('save', calculateReportAvg);

module.exports = model('Report', ReportSchema);
