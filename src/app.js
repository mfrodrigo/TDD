const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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
