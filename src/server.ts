import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import * as Sentry from '@sentry/node';
import { config } from 'dotenv';
import routes from './modules/routes';
import database from './database/mongoose';
import { setQueryStringList, ErrorHandlerMiddleware } from '@mobixtec/visse';
import serverless from 'serverless-http';
import cors from 'cors';

config();

Sentry.init({ dsn: process.env.DNS_SENTRY });

const app = express();

app.use(setQueryStringList());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use((_req: Request, res: Response, next: NextFunction) => {
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

app.use(ErrorHandlerMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3434);
  database();
}

export default app;

module.exports.handler = serverless(app);
