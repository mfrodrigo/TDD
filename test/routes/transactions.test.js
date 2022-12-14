const request = require('supertest');
const app = require('../../src/app');

let user1;
let user2;
let acc1;
let acc2;
let token;

const MAIN_ROUTE = '/v1/transactions';

beforeAll(async () => {
  await app.db('transactions').del();
  await app.db('accounts').del();
  await app.db('users').del();
  const users = await app.db('users').insert([
    {
      name: 'user # 1',
      email: 'user1@example.com',
      password: '$2a$10$Qe.guFzZmGfME2y7hjZ6pewJL3GC/PJbovIeUnVTEI7nFzko5wEH.',
    },
    {
      name: 'user # 2',
      email: 'user2@example.com',
      password: '$2a$10$Qe.guFzZmGfME2y7hjZ6pewJL3GC/PJbovIeUnVTEI7nFzko5wEH.',
    },
  ], '*');
  [user1, user2] = users;
  [acc1] = await app.services.accounts.save({
    name: 'account # 1', user_id: user1.id,
  });
  [acc2] = await app.services.accounts.save({
    name: 'account # 2', user_id: user2.id,
  });
  token = await app.services.auth.authenticate(user1, '123456');
});

test('Deve listar apenas as transações do usuário', () => app.db('transactions').insert([
  {
    description: 'T1', date: new Date(), ammount: 100, type: 'I', acc_id: acc1.id,
  },
  {
    description: 'T2', date: new Date(), ammount: 100, type: 'O', acc_id: acc2.id,
  },
])
  .then(() => request(app)
    .get(MAIN_ROUTE)
    .set('authorization', `bearer ${token}`))
  .then((res) => {
    expect(res.status).toEqual(200);
    expect(res.body[0].description).toEqual('T1');
  }));
