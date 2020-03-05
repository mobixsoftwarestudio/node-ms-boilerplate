/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { loginValidation } from './validations';
import ErrorHandler from '../../utils/error';
import { getToken } from '../../utils/passport-helper';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const error = loginValidation(req.body);

    if (error) throw new ErrorHandler(400, 'Email and password combination is invalid.', error);

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) throw new ErrorHandler(500, err.message);
      if (!user) throw new ErrorHandler(403, info.message);

      const token = getToken(user);
      return res.status(200).json({ token });
    })(req, res);
  } catch (error) {
    next(error);
  }
};

export const protectedRoute = async (_req: Request, res: Response) => {
  return res.status(200).json({ name: 'protected route' });
};
