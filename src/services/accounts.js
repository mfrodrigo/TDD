module.exports = (app) => {
  const find = (filter = {}) => app.db('accounts').where(filter).select();

  const save = (account) => app.db('accounts').insert(account, '*');

  return { save, find };
};
