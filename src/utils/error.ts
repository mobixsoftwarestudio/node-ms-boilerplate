import { Request, Response, NextFunction } from 'express';
import { CompressionTypes } from 'kafkajs';
import { stringify } from 'flatted/cjs';
import { Dictionary } from 'lodash';

export default class ErrorHandler extends Error {
  statusCode: number;
  fieldErrors: Dictionary<string[]>;
  nonFieldErrors: Array<string>;

  constructor(
    statusCode: number,
    message: string,
    fieldErrors?: Dictionary<string[]>,
    nonFieldErrors?: Array<string>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
    this.nonFieldErrors = nonFieldErrors;
  }
}

export const errorHandlerMiddleware = async (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { statusCode, message, fieldErrors, nonFieldErrors } = err;
  res.status(statusCode).json({
    message,
    field_errors: fieldErrors,
    non_field_errors: nonFieldErrors,
  });

  if (process.env.NODE_ENV !== 'test') {
    const { locals } = res;
    const { producer } = locals;

    const logObj = {
      service: process.env.KAFKA_CLIENT || 'xxx-service',
      request: req,
      response: res,
      httpStatus: statusCode,
    };
    await producer.connect();
    await producer.send({
      topic: 'logging.errors',
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: stringify(logObj),
        },
      ],
    });
    await producer.disconnect();
  }

  next();
};
