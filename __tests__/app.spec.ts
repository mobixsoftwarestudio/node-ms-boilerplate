/* eslint-disable @typescript-eslint/no-var-requires */
const supertest = require('supertest');
const app = require('../src/server');

describe('should initial test API', () => {
  afterAll((done) => {
    done();
  });

  it('should return get return 200 and OK', async () => {
    const res = await supertest(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id', 1);
    expect(res.body[0]).toHaveProperty('name', 'Name');
  });

  it('should return post return 200 and OK', async () => {
    const res = await supertest(app)
      .post('/')
      .send({ name: 'Countries', id: 5 })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(3);
    expect(res.body.message).toBe('Success!');
  });
});
