const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const morgan = require('morgan');
const knexfile = require('../knexfile');

// Todo: Criar chaveamento dinâmico
app.db = knex(knexfile.test);

app.use(morgan('dev'));

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'ok' });
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'ValidationError') res.status(400).send({ error: message });
  else res.status(500).send({ name, message, stack });
  next(err);
});

module.exports = app;
