const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select(['id', 'name', 'email']);

  const findById = (id) => app.db('users').where(id).first();

  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório.');
    if (!user.email) throw new ValidationError('Email é um atributo obrigatório.');
    if (!user.password) throw new ValidationError('Senha é um atributo obrigatório.');
    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) throw new ValidationError('Já existe um usuário com esse email.');
    const newUser = { ...user };
    newUser.password = getPasswordHash(newUser.password);
    return app.db('users').insert(newUser, ['id', 'name', 'email']);
  };

  return { findAll, findById, save };
};
