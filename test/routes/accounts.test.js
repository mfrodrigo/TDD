const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const result = await app.services.users.save({
    name: 'User Account',
    email: `${Date.now()}@gmail.com`,
    password: '123456',
  });
  user = { ...result[0] };
});

test('Deve inserir uma conta com sucesso', () => request(app)
  .post(MAIN_ROUTE)
  .send({
    name: '#Acc1',
    user_id: user.id,
  })
  .then((response) => {
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('#Acc1');
  }));

test('Deve listar todas as contas', () => app.services.accounts.save({ name: 'Acc list', user_id: user.id })
  .then(() => request(app)
    .get(MAIN_ROUTE)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    })));
