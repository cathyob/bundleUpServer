'use strict';

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now,
  },
  temp: {
    type: Number,
  },
  feelsLike: {
    type: Number,
    required:true,
  },
  weatherConditions: {
    type: String,
    required: true,
  },
  bottomLayers: {
    type: String,
    default: '',
  },
  topLayers: {
    type: String,
    required: true,
    default: '',
  },
  accessories: {
    type: String,
    default: '',
  },
  activityLevel: {
    type: Number,
    required: true,
  },
  comfortLevel: {
    type: Number,
    required: true,
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
