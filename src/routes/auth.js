const express = require('express');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const router = express.Router();
  router.post(
    '/signin',
    (req, res, next) => app.services.users.findAll({ email: req.body.email })
      .then((user) => {
        if (user.length === 0) throw new ValidationError('Usuário inválido.');
        return app.services.users.findById({ id: user[0].id });
      })
      .then((user) => {
        const token = app.services.auth.authenticate(user, req.body.password);
        res.status(200).json({ token });
      })
      .catch((error) => next(error)),
  );

  router.post(
    '/signup',
    async (req, res, next) => app.services.users
      .save(req.body)
      .then((users) => res.status(201).json(users[0]))
      .catch((err) => next(err)),
  );

  return router;
};
