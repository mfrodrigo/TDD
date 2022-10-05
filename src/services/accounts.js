module.exports = (app) => {
  const find = (filter = {}) => app.db('accounts').where(filter).select();

  const save = async (account) => {
    if (!account.name) return { error: 'Nome é um atributo obrigatório.' };
    return app.db('accounts').insert(account, '*');
  };

  const update = (id, account) => app.db('accounts').where({ id }).update(account, '*');

  const remove = (id) => app.db('accounts').where({ id }).del();

  return {
    find, save, update, remove,
  };
};
