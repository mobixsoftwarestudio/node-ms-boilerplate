/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';
import passport from 'passport';
import { getToken } from '../../passport-helper';
import { loginValidation } from './validations';

export const login = async (req: Request, res: Response) => {
  const error = loginValidation(req.body);

  if (error)
    return res.status(400).send({
      success: false,
      error,
    });

  passport.authenticate('local', { session: false }, (err, user, info) => {
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
};

export const protect = async (req: Request, res: Response) => {
  return res.status(200).json({ name: 'protected route' });
};