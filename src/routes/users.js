module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users))
      .catch((err) => next(err));
  };

  const create = async (req, res, next) => app.services.users
    .save(req.body)
    .then((users) => res.status(201).json(users[0]))
    .catch((err) => next(err));

  return { findAll, create };
};
