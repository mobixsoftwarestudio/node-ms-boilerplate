import { ValidationError } from 'express-validator';
import { has, Dictionary } from 'lodash';

export const parseErrors = (
  errors: ValidationError[],
): Dictionary<{ id: string; message: string }[]> => {
  const dict = {};
  errors.forEach((error) => {
    if (!!dict[error.param]) {
      if (
        !dict[error.param].find((singleError: { id: string }) => singleError.id === error.msg.id)
      ) {
        dict[error.param].push(error.msg);
      }
    } else {
      // TODO: Refactor this block.
      if (has(error, ['msg', 'id'])) {
        dict[error.param] = [error.msg];
      } else {
        dict[error.param] = error.msg;
      }
    }
  });
  return dict;
};
