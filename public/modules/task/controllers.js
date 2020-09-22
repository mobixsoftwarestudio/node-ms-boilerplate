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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../utils/error"));
const task_1 = __importDefault(require("./models/task"));
exports.createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.create({
            title: req.body.title,
            description: req.body.description,
        });
        return res
            .status(200)
            .json(task.serialize())
            .end();
    }
    catch (error) {
        if (error instanceof error_1.default) {
            next(error);
        }
        else {
            next(new error_1.default(500, error.message));
        }
    }
});
//# sourceMappingURL=controllers.js.map