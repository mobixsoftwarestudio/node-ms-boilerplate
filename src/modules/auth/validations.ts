/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Joi from '@hapi/joi';
import { structureValidationScheme } from '../../utils/validationSchema';

// Login Validation
export const loginValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });
  const valid = schema.validate(data, { abortEarly: false });

  return structureValidationScheme(valid?.error?.details);
};
