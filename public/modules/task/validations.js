"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.validationCreateTask = () => [
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
//# sourceMappingURL=validations.js.map