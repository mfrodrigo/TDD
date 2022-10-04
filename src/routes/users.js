module.exports = () => {
  const findAll = (req, res) => {
    const user = [
      { name: 'John Doe', email: 'john@example.com' },
    ];
    res.status(200).send(user);
  };

  const create = (req, res) => {
    res.status(201).send(req.body);
  };
  return { findAll, create };
};
