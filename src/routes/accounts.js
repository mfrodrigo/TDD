module.exports = (app) => {
  const findAll = (req, res) => app.services.accounts.findAll()
    .then((result) => res.status(200).json(result));

  const create = (req, res) => app.services.accounts.save(req.body)
    .then((result) => res.status(201).json(result[0]));
  return { create, findAll };
};
