"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const Sentry = __importStar(require("@sentry/node"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./modules/routes"));
const mongoose_1 = __importDefault(require("./database/mongoose"));
const visse_1 = require("@mobixtec/visse");
const serverless_http_1 = __importDefault(require("serverless-http"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.config();
Sentry.init({ dsn: process.env.DNS_SENTRY });
const app = express_1.default();
app.use(visse_1.setQueryStringList());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(cors_1.default());
if (process.env.NODE_ENV !== 'test') {
    app.use((_req, res, next) => {
        next();
    });
}
if (process.env.NODE_ENV === 'production') {
    app.use(Sentry.Handlers.requestHandler());
}
app.use(routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(Sentry.Handlers.errorHandler());
}
app.use(visse_1.ErrorHandlerMiddleware);
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 3434);
    mongoose_1.default();
}
exports.default = app;
module.exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=server.js.map