const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => app.services.transactions
    .find(req.user.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error)));

  router.post('/', (req, res, next) => app.services.transactions
    .create(req.body)
    .then(([result]) => res.status(201).json(result))
    .catch((error) => next(error)));

  return router;
};
