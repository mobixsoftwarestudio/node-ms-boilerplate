"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isUndefined_1 = __importDefault(require("lodash/isUndefined"));
const DEFAULT_ITEMS_PER_PAGE = 50;
const ITEMS_PER_PAGE_LIMIT = 100;
const DEFAULT_PAGE = 0;
const paginationMiddleware = (req, _res, next) => {
    if (isUndefined_1.default(req.query.limit))
        req.query.limit = DEFAULT_ITEMS_PER_PAGE;
    else if (req.query.limit > ITEMS_PER_PAGE_LIMIT)
        req.query.limit = ITEMS_PER_PAGE_LIMIT;
    else
        req.query.limit = Number(req.query.limit);
    if (isUndefined_1.default(req.query.page))
        req.query.page = DEFAULT_PAGE;
    else
        req.query.page = Number(req.query.page);
    req.query.skip = req.query.limit * req.query.page;
    next();
};
exports.default = paginationMiddleware;
//# sourceMappingURL=paginationMiddleware.js.map