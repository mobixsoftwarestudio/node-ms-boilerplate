import request from 'supertest';
import app from '../src/server';

import mongoose from 'mongoose';
// import { getData } from '../utils/mock';
import { MongoMemoryServer } from 'mongodb-memory-server';

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

jest.setTimeout(10000);

describe('Task', () => {
  let mongoServer;

  beforeAll(async (done) => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, options);

    done();
  });

  beforeEach(async () => {});

  afterAll(async (done) => {
    await mongoose.connection.close();
    await mongoServer.stop();
    done();
  });

  it('Create Task', async (done) => {
    const res = await request(app)
      .post(`/task`)
      .send({
        title: 'New task',
        description: 'Mobix é legal, uhul',
      });

    expect(res.status).toBe(200);

    done();
  });

  it('Create Task, without send title', async (done) => {
    const res = await request(app)
      .post(`/task`)
      .send({
        description: 'Mobix é legal, uhul',
      });

    expect(res.status).toBe(422);

    done();
  });

  it('Create Task, without send data', async (done) => {
    const res = await request(app)
      .post(`/task`)
      .send();

    expect(res.status).toBe(422);

    done();
  });

  it('List Tasks', async (done) => {
    const res = await request(app).get(`/task`);

    expect(res.status).toBe(200);

    done();
  });
});
