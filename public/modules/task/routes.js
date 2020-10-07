"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validations_1 = require("./validations");
const visse_1 = require("@mobixtec/visse");
const router = express_1.Router();
router
    .route('/')
    .post(validations_1.validationCreateTask(), visse_1.validationMiddleware, controllers_1.createTask)
    .get(controllers_1.listTask);
exports.default = router;
//# sourceMappingURL=routes.js.map