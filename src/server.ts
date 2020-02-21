import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3434);
