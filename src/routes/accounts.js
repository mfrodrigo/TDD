module.exports = (app) => {
  const findById = (req, res) => app.services.accounts.find({ id: req.params.id })
    .then((result) => res.status(200).json(result[0]));

  const findAll = (req, res, next) => app.services.accounts.find()
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error));

  const create = (req, res, next) => app.services.accounts.save(req.body)
    .then((result) => res.status(201).json(result[0]))
    .catch((error) => next(error));

  const update = (req, res, next) => app.services.accounts.update(req.params.id, req.body)
    .then((result) => res.status(200).json(result[0]))
    .catch((error) => next(error));

  const remove = (req, res, next) => app.services.accounts.remove(req.params.id)
    .then((result) => res.status(204).json(result))
    .catch((error) => next(error));

  return {
    findById, findAll, update, create, remove,
  };
};
