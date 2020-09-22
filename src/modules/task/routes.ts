import { Router } from 'express';
import { createTask, listTask } from './controllers';
import { validationCreateTask } from './validations';
import { validationMiddleware } from '@mobixtec/visse';
const router = Router();

router
  .route('/')
  .post(validationCreateTask(), validationMiddleware, createTask)
  .get(listTask);

export default router;
