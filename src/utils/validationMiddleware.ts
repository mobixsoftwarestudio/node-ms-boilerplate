import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import _isEmpty from 'lodash/isEmpty';
import ErrorHandler from './error';
import { parseErrors } from './validationSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req).array();

    if (!_isEmpty(errors))
      throw new ErrorHandler(422, 'There are validation errors.', parseErrors(errors));

    next();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      next(error);
    } else {
      next(new ErrorHandler(500, error.message));
    }
  }
};
