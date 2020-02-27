import express from 'express';
import { isEmpty } from 'lodash';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import { getToken } from './passport-helper';

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
app.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      return res.status(400).json({
        message: info.message,
      });
    }
    if (!user) {
      return res.status(403).json({
        message: info.message,
      });
    }

    const token = getToken(user);
    return res.status(200).json({ token });
  })(req, res);
});
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) =>
  res.status(200).json({ name: 'protected route' }),
);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3434);
}

module.exports = app;
