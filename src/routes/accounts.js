const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/', (req, res, next) => app.services.accounts
    .save({ ...req.body, user_id: req.user.id })
    .then((result) => res.status(201).json(result[0]))
    .catch((error) => next(error)));

  router.get('/', (req, res, next) => app.services.accounts
    .find({ user_id: req.user.id })
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error)));

  router.get('/:id', (req, res, next) => app.services.accounts.find({ id: req.params.id })
    .then((result) => res.status(200).json(result[0]))
    .catch((error) => next(error)));

  router.put('/:id', (req, res, next) => app.services.accounts.update(req.params.id, req.body)
    .then((result) => res.status(200).json(result[0]))
    .catch((error) => next(error)));

  router.delete('/:id', (req, res, next) => app.services.accounts.remove(req.params.id)
    .then((result) => res.status(204).json(result))
    .catch((error) => next(error)));

  return router;
};
