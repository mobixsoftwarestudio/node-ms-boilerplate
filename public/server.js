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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const Sentry = __importStar(require("@sentry/node"));
const dotenv_1 = require("dotenv");
const kafkajs_1 = require("kafkajs");
const flatted_1 = require("flatted");
const routes_1 = __importDefault(require("./modules/routes"));
const visse_1 = require("@mobixtec/visse");
dotenv_1.config();
Sentry.init({ dsn: process.env.DNS_SENTRY });
let producer;
let consumer;
const app = express_1.default();
app.use(visse_1.setQueryStringList());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
if (process.env.NODE_ENV !== 'test') {
    const kafka = new kafkajs_1.Kafka({
        clientId: process.env.KAFKA_CLIENT || 'xxx-service',
        brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092'],
    });
    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: 'logstash-group' });
    app.use((_req, res, next) => {
        res.locals.producer = producer;
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
const startListening = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'logging.errors', fromBeginning: true });
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            const messageValue = flatted_1.parse(message.value);
            console.log(`- ${prefix} ${messageValue}`);
        }),
    });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 3434);
    startListening();
}
module.exports = app;
//# sourceMappingURL=server.js.map