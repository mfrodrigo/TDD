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

test('Deve rotornar conta por Id', () => app.services.accounts.save({ name: 'AccId', user_id: user.id })
  .then((response) => request(app).get(`${MAIN_ROUTE}/${response[0].id}`))
  .then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('AccId');
    expect(response.body.user_id).toBe(user.id);
  }));

test('Deve alterar uma conta', () => app.services.accounts.save({ name: 'Acc To Update', user_id: user.id })
  .then((account) => request(app).put(`${MAIN_ROUTE}/${account[0].id}`)
    .send({ name: 'Acc Updated' })
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Acc Updated');
    })));

test('Deve remover uma conta', () => app.services.accounts.save({ name: 'Delete', user_id: user.id })
  .then((account) => request(app).delete(`${MAIN_ROUTE}/${account[0].id}`)
    .then((response) => {
      expect(response.status).toBe(204);
    })));
