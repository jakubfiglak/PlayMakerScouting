const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  player: {
    type: Schema.ObjectId,
    ref: 'Player',
    required: 'Please add a player',
  },
  open: {
    type: Boolean,
    default: true,
  },
  scout: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptDate: {
    type: Date,
  },
});

module.exports = model('Order', OrderSchema);
