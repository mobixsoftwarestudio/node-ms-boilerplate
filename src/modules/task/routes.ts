import { Router } from 'express';
import { createTask } from './controllers';
import { validationCreateTask } from './validations';
import validationMiddleware from '../../utils/validationMiddleware';

const router = Router();

router.post('/', validationCreateTask(), validationMiddleware, createTask);

export default router;
