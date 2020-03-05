import { Request, Response, NextFunction } from 'express';

export default class ErrorHandler extends Error {
  statusCode: number;
  fieldErrors: Array<string>;
  nonFieldErrors: Array<string>;

  constructor(
    statusCode: number,
    message: string,
    fieldErrors?: Array<string>,
    nonFieldErrors?: Array<string>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
    this.nonFieldErrors = nonFieldErrors;
  }
}

export const errorHandlerMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { statusCode, message, fieldErrors, nonFieldErrors } = err;
  res.status(statusCode).json({
    message,
    field_errors: fieldErrors,
    non_field_errors: nonFieldErrors,
  });
  // const logObj = {
  //   req,
  //   res,
  //   httpStatus: statusCode,
  // };
};
