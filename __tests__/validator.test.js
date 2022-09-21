'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);


describe('Validator', () => {
  it('sends 404 for bad route', async() => {
    const response = await request.get('/wrong');
    expect(response.status).toEqual(404);
  });

  it('sends 500 for no name in query string', async() => {
    const response = await request.get('/user?name=');
    expect(response.status).toEqual(500);
  });

  it('sends 200 if name is in query string', async () => {
    const response = await request.get('/user?name=koda');
    expect(response.status).toEqual(200);
  });

  it('query string contains name, output object correct', async() => {
    const response = await request.get('/user?name=koda');
    expect(response.body).toHaveProperty('name');
  });
});
