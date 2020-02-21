import * as supertest from 'supertest';

describe('should initial test API', () => {
  it('should return get return 200 and OK', (done) => {
    supertest('http://localhost:3434')
      .get('/')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id', 1);
        expect(res.body[0]).toHaveProperty('name', 'Name');
        done();
      });
  });

  it('should return post return 200 and OK', (done) => {
    supertest('http://localhost:3434')
      .post('/')
      .send({ name: 'Countries', id: 5 })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(3);
        expect(res.body.message).toBe('Success!');
        done();
      });
  });
});
