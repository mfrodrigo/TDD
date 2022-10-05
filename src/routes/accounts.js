module.exports = (app) => {
  const findById = (req, res) => app.services.accounts.find({ id: req.params.id })
    .then((result) => res.status(200).json(result[0]));

  const findAll = (req, res) => app.services.accounts.find()
    .then((result) => res.status(200).json(result));

  const create = (req, res) => app.services.accounts.save(req.body)
    .then((result) => res.status(201).json(result[0]));
  return { create, findAll, findById };
};
