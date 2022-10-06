const request = require('supertest');
const app = require('../../src/app');

const email = `${Date.now()}@gmail.com`;

test('Deve receber token ao logar', () => app.services.users
  .save({ name: 'John', email, password: '123456' })
  .then(() => request(app)
    .post('/auth/signin')
    .send({ email, password: '123456' }))
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeUndefined();
  }));
