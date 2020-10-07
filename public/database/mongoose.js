"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require mongoose module
const mongoose_1 = __importDefault(require("mongoose"));
// require chalk module to give colors to console text
const chalk_1 = __importDefault(require("chalk"));
// Load environment variables
const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
// Connect to MongoDB
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: DB_USER,
    pass: DB_PWD,
};
const connected = chalk_1.default.bold.cyan;
const error = chalk_1.default.bold.red;
const disconnected = chalk_1.default.bold.yellow;
const termination = chalk_1.default.bold.magenta;
const connect = () => {
    mongoose_1.default.connect(DB_URL, options);
    mongoose_1.default.connection.on('connected', function () {
        console.log(connected('Mongoose default connection is open to', DB_URL));
    });
    mongoose_1.default.connection.on('error', function (err) {
        console.log(error(`Mongoose default connection has occured ${err} error`));
    });
    mongoose_1.default.connection.on('disconnected', function () {
        console.log(disconnected('Mongoose default connection is disconnected'));
    });
    process.on('SIGINT', function () {
        mongoose_1.default.connection.close(function () {
            console.log(termination('Mongoose default connection is disconnected due to application termination'));
            process.exit(0);
        });
    });
};
// export this function and imported by server.js
exports.default = connect;
//# sourceMappingURL=mongoose.js.map