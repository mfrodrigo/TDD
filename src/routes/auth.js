module.exports = (app) => {
  const signin = (req, res, next) => app.services.users.findAll({ email: req.body.email })
    .then((user) => app.services.users.findById({ id: user[0].id }))
    .then((user) => {
      const token = app.services.auth.authenticate(user, req.body.password);
      res.status(200).json({ token });
    })
    .catch((error) => next(error));

  return { signin };
};
