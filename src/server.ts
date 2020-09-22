import express, { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'lodash';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as Sentry from '@sentry/node';
import { config } from 'dotenv';
import { Kafka } from 'kafkajs';
import { parse } from 'flatted/cjs';
import routes from './modules/routes';
import database from './database/mongoose';
import { ErrorHandler, setQueryStringList } from '@mobixtec/visse';

config();

Sentry.init({ dsn: process.env.DNS_SENTRY });

let producer: any;
let consumer: any;

const app = express();

app.use(setQueryStringList());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV !== 'test') {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT || 'xxx-service',
    brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092'],
  });
  producer = kafka.producer();
  consumer = kafka.consumer({ groupId: 'logstash-group' });

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.locals.producer = producer;
    next();
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.requestHandler());
}

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
}

app.use(ErrorHandler.errorHandlerMiddleware);

const startListening = async (): Promise<void> => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'logging.errors', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      const messageValue = parse(message.value);
      console.log(`- ${prefix} ${messageValue}`);
    },
  });
};

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3434);
  startListening();
}

module.exports = app;
