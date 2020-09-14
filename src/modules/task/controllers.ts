/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../utils/error';
import TaskModel from './models/task';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TaskModel.create({
      title: req.body.title,
      description: req.body.description,
    });

    return res
      .status(200)
      .json(task.serialize())
      .end();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      next(error);
    } else {
      next(new ErrorHandler(500, error.message));
    }
  }
};
