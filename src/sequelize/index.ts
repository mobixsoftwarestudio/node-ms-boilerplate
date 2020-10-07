import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV;
const config = require('./config')[env];

const connection = new Sequelize(config);

export default connection;
