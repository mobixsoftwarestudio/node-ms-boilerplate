"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const cjs_1 = require("flatted/cjs");
class ErrorHandler extends Error {
    constructor(statusCode, message, fieldErrors, nonFieldErrors) {
        super(message);
        this.statusCode = statusCode;
        this.fieldErrors = fieldErrors;
        this.nonFieldErrors = nonFieldErrors;
    }
}
exports.default = ErrorHandler;
exports.errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, fieldErrors, nonFieldErrors } = err;
    res.status(statusCode).json({
        message,
        field_errors: fieldErrors,
        non_field_errors: nonFieldErrors,
    });
    if (process.env.NODE_ENV !== 'test') {
        const { locals } = res;
        const { producer } = locals;
        const logObj = {
            service: process.env.KAFKA_CLIENT || 'xxx-service',
            request: req,
            response: res,
            httpStatus: statusCode,
        };
        yield producer.connect();
        yield producer.send({
            topic: 'logging.errors',
            compression: kafkajs_1.CompressionTypes.GZIP,
            messages: [
                {
                    value: cjs_1.stringify(logObj),
                },
            ],
        });
        yield producer.disconnect();
    }
    next();
});
//# sourceMappingURL=error.js.map