"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.parseErrors = (errors) => {
    const dict = {};
    errors.forEach((error) => {
        if (!!dict[error.param]) {
            if (!dict[error.param].find((singleError) => singleError.id === error.msg.id)) {
                dict[error.param].push(error.msg);
            }
        }
        else {
            // TODO: Refactor this block.
            if (lodash_1.has(error, ['msg', 'id'])) {
                dict[error.param] = [error.msg];
            }
            else {
                dict[error.param] = error.msg;
            }
        }
    });
    return dict;
};
//# sourceMappingURL=validationSchema.js.map