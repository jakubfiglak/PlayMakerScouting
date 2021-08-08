const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('@meanie/mongoose-to-json');
const { voivodeships, divisions } = require('../../utils/data');

const { Schema, model } = mongoose;

const ClubSchema = new Schema(
  {
    name: {
      type: String,
      required: 'please add club name',
      trim: true,
    },
    voivodeship: {
      type: String,
      enum: [...voivodeships, 'Zagranica'],
      required: 'please add clubs voivodeship',
    },
    division: {
      type: String,
      enum: divisions,
      required: 'please add clubs current division',
    },
    lnpID: {
      type: String,
      trim: true,
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
  },
  { timestamps: true }
);

ClubSchema.plugin(mongoosePaginate);
ClubSchema.plugin(toJson);

module.exports = model('Club', ClubSchema);
