const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
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
    notes: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.plugin(mongoosePaginate);

OrderSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'order',
  justOne: false,
});

module.exports = model('Order', OrderSchema);
