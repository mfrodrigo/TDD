const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/auth';
const email = `auth${Date.now()}@gmail.com`;

test('Deve criar usuário via signup', () => request(app)
  .post(`${MAIN_ROUTE}/signup`)
  .send({ name: 'signup', email: `signup${email}`, password: 'password' })
  .then((response) => {
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('signup');
    expect(response.body.email).toBe(`signup${email}`);
    expect(response.body).not.toHaveProperty('password');
  }));

test('Deve receber token ao logar', () => app.services.users
  .save({ name: 'Auth', email, password: '123456' })
  .then(() => request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ email, password: '123456' }))
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeUndefined();
  }));

test('Não deve autenticar com senha errada', () => app.services.users
  .save({ name: 'Auth2', email: `auth2${email}`, password: '123456' })
  .then(() => request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ email: `auth2${email}`, password: '12456' }))
  .then((res) => {
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Usuário inválido.');
  }));

test('Não deve autenticar com senha errada', () => request(app)
  .post(`${MAIN_ROUTE}/signin`)
  .send({ email: `auth3${email}`, password: '12456' })
  .then((res) => {
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Usuário inválido.');
  }));

test('Não deve acessar uma rota protegida sem o token', () => request(app)
  .get('/v1/users')
  .then((res) => {
    expect(res.status).toBe(401);
  }));
