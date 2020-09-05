const mongoose = require('mongoose');
const voivodeships = require('../utils/voivodeships');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  street: {
    type: String,
    required: 'please add a street',
  },
  streetNo: {
    type: String,
    required: 'please add a street number',
  },
  zipCode: {
    type: String,
    required: 'please add a zipcode',
  },
  city: {
    type: String,
    required: 'please add a city',
  },
  voivodeship: {
    type: String,
    enum: voivodeships,
  },
  country: {
    type: String,
    required: 'please add a country',
  },
});

module.exports = AddressSchema;
