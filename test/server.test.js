const supertest = require('supertest');

const request = supertest('http://localhost:3001');

test('Deve responder na porta 3001', () => request.get('/').then((response) => expect(response.statusCode).toBe(200)));
