module.exports = (app) => {
  const findById = (req, res) => app.services.accounts.find({ id: req.params.id })
    .then((result) => res.status(200).json(result[0]));

  const findAll = (req, res) => app.services.accounts.find()
    .then((result) => res.status(200).json(result));

  const create = (req, res) => app.services.accounts.save(req.body)
    .then((result) => res.status(201).json(result[0]))
    .catch((error) => res.status(400).json({ error: error.message }));

  const update = (req, res) => app.services.accounts.update(req.params.id, req.body)
    .then((result) => res.status(200).json(result[0]));

  const remove = (req, res) => app.services.accounts.remove(req.params.id)
    .then((result) => res.status(204).json(result));

  return {
    findById, findAll, update, create, remove,
  };
};
