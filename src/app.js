const app = require('express')();
const consign = require('consign');

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/users', (req, res) => {
  const user = [
    { name: 'John Doe', email: 'john@example.com' },
  ];
  res.status(200).send(user);
});

app.post('/users', (req, res) => {
  res.status(201).send(req.body);
});

module.exports = app;
