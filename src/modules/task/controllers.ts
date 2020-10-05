/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import TaskModel from './models/task';
import { filter, pagination, sort, ErrorHandler } from '@mobixtec/visse';

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

export const listTask = async (req, res, next) => {
  try {
    const response = await TaskModel.find({ ...filter.filterQueryStringDate(req) })
      .sort(sort.sortInFind(req.query.order))
      .skip(req.query.limit * req.query.page)
      .limit(req.query.limit);

    const totalCount = await TaskModel.countDocuments({ ...filter.filterQueryStringDate(req) });

    return res.status(200).json(
      pagination({
        results: response.map((item) => item.serialize()),
        totalCount,
        limit: req.query.limit,
        page: req.query.page,
      }),
    );
  } catch (error) {
    if (error instanceof ErrorHandler) {
      next(error);
    } else {
      next(new ErrorHandler(500, error.message));
    }
  }
};
