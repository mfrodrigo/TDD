const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/accounts';
let user;
let user2;

beforeEach(async () => {
  const result = await app.services.users
    .save({
      name: 'User Account',
      email: `${Date.now()}@gmail.com`,
      password: '123456',
    });
  user = { ...result[0] };
  user.token = jwt.encode(user, 'secret');
  const result2 = await app.services.users
    .save({
      name: 'User Account',
      email: `2${Date.now()}@gmail.com`,
      password: '123456',
    });
  user2 = { ...result2[0] };
  user2.token = jwt.encode(user2, 'secret');
});

test('Deve inserir uma conta com sucesso', () => request(app)
  .post(MAIN_ROUTE)
  .set('authorization', `bearer ${user.token}`)
  .send({
    name: '#Acc1',
  })
  .then((response) => {
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('#Acc1');
  }));

test('Não deve inserir uma conta sem nome', () => request(app)
  .post(MAIN_ROUTE)
  .set('authorization', `bearer ${user.token}`)
  .send({})
  .then((response) => {
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Nome é um atributo obrigatório.');
  }));

test('Não deve inserir uma  conta de nome duplicado, para o mesmo usuário', () => app
  .db('accounts')
  .insert({ name: 'Acc duplicada', user_id: user.id })
  .then(() => request(app)
    .post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ name: 'Acc duplicada' }))
  .then((response) => {
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('Já existe uma conta com esse nome.');
  }));

test('Deve listar todas as contas', () => app.services.accounts
  .save({ name: 'Acc list', user_id: user.id })
  .then(() => request(app)
    .get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    })));

test('Deve listar apenas as constas do usuário', () => app.services.accounts
  .save({ name: 'account1', user_id: user.id })
  .then(() => app.services.accounts
    .save({ name: 'account2', user_id: user2.id }))
  .then(() => request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user2.token}`))
  .then((response) => {
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('account2');
  }));

test('Deve rotornar conta por Id', () => app.services.accounts
  .save({ name: 'AccId', user_id: user.id })
  .then((response) => request(app)
    .get(`${MAIN_ROUTE}/${response[0].id}`)
    .set('authorization', `bearer ${user.token}`))
  .then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('AccId');
    expect(response.body.user_id).toBe(user.id);
  }));

test('Deve alterar uma conta', () => app.services.accounts
  .save({ name: 'Acc To Update', user_id: user.id })
  .then((account) => request(app).put(`${MAIN_ROUTE}/${account[0].id}`)
    .send({ name: 'Acc Updated' })
    .set('authorization', `bearer ${user.token}`)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Acc Updated');
    })));

test('Deve remover uma conta', () => app.services.accounts
  .save({ name: 'Delete', user_id: user.id })
  .then((account) => request(app)
    .delete(`${MAIN_ROUTE}/${account[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((response) => {
      expect(response.status).toBe(204);
    })));
