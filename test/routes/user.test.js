const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todos os usuários', () => request(app).get('/users')
  .then((response) => {
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  }));

test('Deve inserir usuário com sucesso', () => {
  const email = `${Date.now()}@gmail.com`;
  return request(app).post('/users')
    .send({ name: 'Walter Mitty', email, password: '12356' })
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Walter Mitty');
    });
});
