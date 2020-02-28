import express from 'express';
import { isEmpty } from 'lodash';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from './modules/routes';
import { config } from 'dotenv';
config();

import database from './database/mongoose';
// TODO: tests with db, remove this condition
if (process.env.NODE_ENV !== 'test') {
  database();
}
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(3434);
}

module.exports = app;
