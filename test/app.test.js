const request = require('supertest');

const app = require('../src/app');

test('Deve responder na raiz', () => request(app).get('/')
  .then((response) => {
    expect(response.status).toEqual(200);
  }));
