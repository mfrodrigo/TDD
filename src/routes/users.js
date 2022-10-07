const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users))
      .catch((err) => next(err));
  });

  router.post('/', async (req, res, next) => app.services.users
    .save(req.body)
    .then((users) => res.status(201).json(users[0]))
    .catch((err) => next(err)));

  return router;
};
