"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateTask = void 0;
const express_validator_1 = require("express-validator");
const validationCreateTask = () => [
    express_validator_1.check('title')
        .exists()
        .withMessage({
        id: 'required-title',
        message: 'Title is required',
    }),
    express_validator_1.check('description')
        .exists()
        .withMessage({
        id: 'required-description',
        message: 'Description is required',
    }),
];
exports.validationCreateTask = validationCreateTask;
//# sourceMappingURL=validations.js.map