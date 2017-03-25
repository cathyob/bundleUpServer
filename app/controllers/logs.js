'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Log = models.log;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Log.find({
      _owner: req.user._id,
    })
    .then(logs => res.json({
      logs: logs.map((e) =>
        e.toJSON({
          virtuals: true,
          user: req.user
        })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    log: req.log.toJSON({
      virtuals: true,
      user: req.user
    }),
  });
};

const create = (req, res, next) => {
  let log = Object.assign(req.body.log, {
    _owner: req.user._id,
  });
  Log.create(log)
    .then(log =>
      res.status(201)
      .json({
        log: log.toJSON({
          virtuals: true,
          user: req.user
        }),
      }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner; // disallow owner reassignment.
  req.log.update(req.body.log)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.log.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, {
  before: [{
      method: setUser,
      only: ['index', 'show']
    },
    {
      method: authenticate,
      only: ['index', 'show', 'create', 'update', 'destroy']
    },
    {
      method: setModel(Log),
      only: ['show']
    },
    {
      method: setModel(Log, {
        forUser: true
      }),
      only: ['update', 'destroy']
    },
  ],
});
