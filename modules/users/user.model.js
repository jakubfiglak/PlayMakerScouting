const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoPopulate = require('mongoose-autopopulate');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const toJson = require('@meanie/mongoose-to-json');
const { voivodeships, userRoles } = require('../../utils/data');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: 'please add a first name',
      trim: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: 'please add a last name',
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'email address is not valid'],
      required: 'please add an email address',
    },
    phone: {
      type: String,
      trim: true,
      validate: [validator.isMobilePhone, 'phone number is not valid'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    voivodeship: {
      type: String,
      enum: [...voivodeships, 'Zagranica'],
    },
    activeRadius: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: 'please add a password',
      minlength: [6, 'password must be at least 6 characters long'],
      match: [
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        'password must contain at least 1 lowercase letter, 1 uppercase letter and 1 digit',
      ],
      private: true,
    },
    role: {
      type: String,
      enum: userRoles,
      default: 'scout',
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'blocked'],
      default: 'pending',
    },
    match: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      autopopulate: true,
    },
    confirmationCode: { type: String, private: true },
    resetPasswordToken: { type: String, private: true },
    resetPasswordExpires: { type: Date, private: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(autoPopulate);
UserSchema.plugin(toJson);

// Encrypt the password before each model save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Get JWT token
UserSchema.methods.getJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      activeRadius: this.activeRadius,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Password comparison
UserSchema.methods.comparePasswords = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

UserSchema.virtual('team', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'members',
  justOne: true,
});

module.exports = model('User', UserSchema);
