const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  player: {
    type: Schema.ObjectId,
    ref: 'Player',
    required: 'Please add a player',
  },
  status: {
    type: String,
    enum: ['open', 'accepted', 'closed'],
    default: 'open',
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
  closeDate: {
    type: Date,
  },
  docNumber: {
    type: String,
  },
  notes: {
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
