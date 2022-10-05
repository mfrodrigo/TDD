module.exports = (app) => {
  const findAll = () => app.db('accounts').select();

  const save = (account) => app.db('accounts').insert(account, '*');

  return { save, findAll };
};
