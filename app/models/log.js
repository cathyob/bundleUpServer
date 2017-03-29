'use strict';

const mongoose = require('mongoose');
const integerValidator = require('mongoose-integer');

const logSchema = new mongoose.Schema({
  date_time: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    integer: true,
  },
  feels_like: {
    type: Number,
    integer: true,
    required: true,
  },
  weather_conditions: {
    type: String,
    required: true,
  },
  bottom_layers: {
    type: String,
    default: '',
  },
  top_layers: {
    type: String,
    default: '',
  },
  accessories: {
    type: String,
    default: '',
  },
  activity_level: {
    type: Number,
    integer: true,
    required: true,
    min: 1,
    max: 5,
  },
  comfort_level: {
    type: Number,
    integer: true,
    required: true,
    min: 1,
    max: 5,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

const Log = mongoose.model('Log', logSchema);

logSchema.plugin(integerValidator);

module.exports = Log;
