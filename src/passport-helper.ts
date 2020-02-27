import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';

const USERS_MOCK = [
  {
    id: 1,
    name: 'Lucas Harada',
    email: 'lucas@mobixtec.com',
    password: 'abcd',
  },
  {
    id: 2,
    name: 'Renato Rodrigues',
    email: 'renato@mobixtec.com',
    password: 'efgh',
  },
];

const JWT_AUDIENCE = 'mobixtec.com';
const JWT_ISSUER = 'accounts.mobixtec.com';
const JWT_SECRET = process.env.JWT_SECRET || 'thisneedstobestoredsafelyandnevercommited';

const jwtOpts = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE,
};

const localStrategy = new passportLocal.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email: string, password: string, cb: Function) => {
    const user = USERS_MOCK.find(
      (mockUser) => mockUser.email === email && mockUser.password === password,
    );
    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' });
    }
    return cb(null, user, { message: 'Signed in successfully.' });
  },
);

const jwtStrategy = new passportJwt.Strategy(
  jwtOpts,
  (payload: { id: string }, done: passportJwt.VerifiedCallback) => {
    const user = USERS_MOCK[payload.id] || null;
    if (user) {
      return done(null, user);
    } else {
      return done(new Error('User not found'), null);
    }
  },
);

export const getToken = (user: { email: string }): string =>
  jwt.sign({ email: user.email }, JWT_SECRET, {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
  });

passport.use(localStrategy);
passport.use(jwtStrategy);
