'use strict';

const mongoose = require('mongoose');

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
  },
  feels_like: {
    type: Number,
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
    required: true,
    default: '',
  },
  accessories: {
    type: String,
    default: '',
  },
  activity_level: {
    type: Number,
    required: true,
    default: '3',
  },
  comfort_level: {
    type: Number,
    required: true,
    default: '3',
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

module.exports = Log;
