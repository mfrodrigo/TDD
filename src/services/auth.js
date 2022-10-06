const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const secret = 'secret';

module.exports = () => {
  const authenticate = (user, password) => {
    if (bcrypt.compareSync(password, user.password)) {
      const payload = { ...user };
      return jwt.encode(payload, secret);
    } throw new ValidationError('Usuário inválido.');
  };

  return { authenticate };
};
