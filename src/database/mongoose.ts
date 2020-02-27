// require mongoose module
import mongoose from 'mongoose';
// require chalk module to give colors to console text
import chalk from 'chalk';

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

const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;

const connect = (): void => {
  mongoose.connect(DB_URL, options);

  mongoose.connection.on('connected', function() {
    console.log(connected('Mongoose default connection is open to', DB_URL));
  });

  mongoose.connection.on('error', function(err) {
    console.log(error(`Mongoose default connection has occured ${err} error`));
  });

  mongoose.connection.on('disconnected', function() {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log(
        termination('Mongoose default connection is disconnected due to application termination'),
      );
      process.exit(0);
    });
  });
};
// export this function and imported by server.js
export default connect;
