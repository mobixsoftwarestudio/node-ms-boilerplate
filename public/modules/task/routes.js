"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validations_1 = require("./validations");
const validationMiddleware_1 = __importDefault(require("../../utils/validationMiddleware"));
const router = express_1.Router();
router.post('/', validations_1.validationCreateTask(), validationMiddleware_1.default, controllers_1.createTask);
exports.default = router;
//# sourceMappingURL=routes.js.map