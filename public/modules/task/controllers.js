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
exports.listTask = exports.createTask = void 0;
const task_1 = __importDefault(require("./models/task"));
const visse_1 = require("@mobixtec/visse");
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (error instanceof visse_1.ErrorHandler) {
            next(error);
        }
        else {
            next(new visse_1.ErrorHandler(500, error.message));
        }
    }
});
exports.createTask = createTask;
const listTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield task_1.default.find(Object.assign({}, visse_1.filter.filterQueryStringDate(req)))
            .sort(visse_1.sort.sortInFind(req.query.order))
            .skip(req.query.limit * req.query.page)
            .limit(req.query.limit);
        const totalCount = yield task_1.default.countDocuments(Object.assign({}, visse_1.filter.filterQueryStringDate(req)));
        return res.status(200).json(visse_1.pagination({
            results: response.map((item) => item.serialize()),
            totalCount,
            limit: req.query.limit,
            page: req.query.page,
        }));
    }
    catch (error) {
        if (error instanceof visse_1.ErrorHandler) {
            next(error);
        }
        else {
            next(new visse_1.ErrorHandler(500, error.message));
        }
    }
});
exports.listTask = listTask;
//# sourceMappingURL=controllers.js.map