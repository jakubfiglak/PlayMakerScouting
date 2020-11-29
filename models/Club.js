const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const voivodeships = require('../utils/voivodeships');

const { Schema, model } = mongoose;

const ClubSchema = new Schema({
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
    enum: [
      'Ekstraklasa',
      'I liga',
      'II liga',
      'III liga',
      'IV liga',
      'Klasa okręgowa',
      'Klasa A',
      'Klasa B',
      'Klasa C',
    ],
    required: 'please add clubs current division',
  },
  lnpID: {
    type: String,
  },
});

ClubSchema.plugin(mongoosePaginate);

module.exports = model('Club', ClubSchema);
