/* eslint-disable @typescript-eslint/explicit-function-return-type */

import lodash from 'lodash';
export const structureValidationScheme = (
  error: { message: string; context: { key: string } }[],
) => {
  const errorsMessages = error.map((e) => {
    const msg = lodash.pick(e, ['message']);
    return msg.message;
  });

  let groupedErrors = lodash
    .chain(errorsMessages)
    .groupBy((key) => key.match(/\w+|"[^"]+"/g)[0])
    .value();

  groupedErrors = lodash.mapKeys(groupedErrors, function(value, key) {
    return key.replace(/['"]+/g, '');
  });

  return groupedErrors;
};
