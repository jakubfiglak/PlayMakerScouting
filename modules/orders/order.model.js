const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const toJson = require('@meanie/mongoose-to-json');

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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNo', start_seq: 50 });
OrderSchema.plugin(toJson);

OrderSchema.virtual('docNumber').get(function () {
  const date = new Date(this.createdAt);
  return `${this.orderNo.toString().padStart(4, '0')}/${date.getFullYear()}`;
});

OrderSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'order',
  justOne: false,
});

module.exports = model('Order', OrderSchema);
