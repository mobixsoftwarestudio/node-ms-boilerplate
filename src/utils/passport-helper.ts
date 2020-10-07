import passport from 'passport';
import passportJwt from 'passport-jwt';

export interface TokenData {
  _id: string;
  permissions: [
    { name: string; userPermission: boolean; accounts: [{ accountId: string; active: boolean }] },
  ];
  tenant_id: string;
  iat: number;
  aud: string;
  iss: string;
}

const JWT_AUDIENCE = 'mobixtec.com';
const JWT_ISSUER = 'accounts.mobixtec.com';
const JWT_SECRET = process.env.JWT_SECRET;

const jwtOpts = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE,
};

export const usePassport = (): void => {
  const jwtStrategy = new passportJwt.Strategy(
    jwtOpts,
    async (payload: { _id: string }, done: passportJwt.VerifiedCallback) => {
      return done(null, payload);
    },
  );

  passport.use(jwtStrategy);
};
