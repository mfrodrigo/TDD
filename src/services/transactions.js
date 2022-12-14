module.exports = (app) => {
  const find = (userId, filter = {}) => app
    .db('transactions')
    .join('accounts', 'accounts.id', 'acc_id')
    .where(filter)
    .andWhere('accounts.user_id', '=', userId);

  const create = (body) => app
    .db('transactions')
    .insert(body, '*');

  return { find, create };
};
