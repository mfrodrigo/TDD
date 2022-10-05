module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users));
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.users.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  return { findAll, create };
};
