const request = require('supertest');

const app = require('../../src/app');

const email = `${Date.now()}@gmail.com`;

test('Deve listar todos os usuários', () => request(app).get('/users')
  .then((response) => {
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  }));

test('Deve inserir usuário com sucesso', () => request(app).post('/users')
  .send({ name: 'Walter Mitty', email, password: '12356' })
  .then((response) => {
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Walter Mitty');
  }));

test('Não deve inserir usuário sem nome', () => request(app).post('/users/')
  .send({ email, password: '12356' })
  .then((response) => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome é um atributo obrigatório.');
  }));

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users')
    .send({ name: 'Rodrigo', password: '0' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório.');
});

test('Não deve inserir usuário sem senha', (done) => {
  request(app).post('/users')
    .send({ name: 'test', email: 'test@example.com' })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Senha é um atributo obrigatório.');
      done();
    })
    .catch((error) => done.fail(error));
});

test('Não deve inserir usuário sem email', () => request(app).post('/users')
  .send({ name: 'test', email, password: 'test' })
  .then((result) => {
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Já existe um usuário com esse email.');
  }));
