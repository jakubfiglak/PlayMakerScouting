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
  docNumber: {
    type: String,
  },
});

OrderSchema.pre('save', async function (next) {
  const count = await model('Order', OrderSchema).countDocuments();
  const date = new Date();
  this.docNumber = `ORD/${date.toISOString().slice(0, 10)}/${count + 1}`;
  next();
});

module.exports = model('Order', OrderSchema);
