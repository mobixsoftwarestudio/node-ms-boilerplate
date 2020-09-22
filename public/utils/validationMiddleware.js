"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const error_1 = __importDefault(require("./error"));
const validationSchema_1 = require("./validationSchema");
exports.default = (req, res, next) => {
    try {
        const errors = express_validator_1.validationResult(req).array();
        if (!isEmpty_1.default(errors))
            throw new error_1.default(422, 'There are validation errors.', validationSchema_1.parseErrors(errors));
        next();
    }
    catch (error) {
        if (error instanceof error_1.default) {
            next(error);
        }
        else {
            next(new error_1.default(500, error.message));
        }
    }
};
//# sourceMappingURL=validationMiddleware.js.map