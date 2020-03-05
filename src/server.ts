import express, { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'lodash';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as Sentry from '@sentry/node';
import { config } from 'dotenv';
import { Kafka } from 'kafkajs';
import routes from './modules/routes';
import database from './database/mongoose';
import { errorHandlerMiddleware } from './utils/error';

config();

//TODO: tests with db, remove this condition
// if (process.env.NODE_ENV !== 'test') {
//   database();
// }

Sentry.init({ dsn: process.env.DNS_SENTRY });

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT || 'xxx-service',
  brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092'],
});
const producer = kafka.producer();

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.producer = producer;
  next();
});
app.use(Sentry.Handlers.requestHandler());

const data = [
  { name: 'Name', id: 1 },
  { name: 'Place', id: 2 },
  { name: 'Object', id: 3 },
];

app.get('/', (req, res) => {
  return res.json(data);
});
app.post('/', (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: 'The body cannot be empty' });
  } else {
    data.push(req.body);
    return res.status(200).json({ message: 'Success!', data });
  }
});

app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3434);
}

module.exports = app;
