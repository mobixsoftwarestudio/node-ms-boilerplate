import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import { getToken } from './passport-helper';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => res.status(200).json({ status: 'alive' }));
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

app.listen(3434);
