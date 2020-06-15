const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: 'Please add a player',
  },
  open: {
    type: Boolean,
    default: true,
  },
  scout: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Order', OrderSchema);
