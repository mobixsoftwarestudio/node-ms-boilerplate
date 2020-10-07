"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV;
const config = require('./config')[env];
const connection = new sequelize_1.Sequelize(config);
exports.default = connection;
//# sourceMappingURL=index.js.map