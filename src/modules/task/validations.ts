import { check, header, param, ValidationChain } from 'express-validator';

export const validationCreateTask = (): ValidationChain[] => [
  check('title')
    .exists()
    .withMessage({
      id: 'required-title',
      message: 'Title is required',
    }),
  check('description')
    .exists()
    .withMessage({
      id: 'required-description',
      message: 'Description is required',
    }),
];
