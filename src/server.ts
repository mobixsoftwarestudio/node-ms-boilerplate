import express from 'express';
import bodyParser from 'body-parser';
import { isEmpty } from 'lodash';

const app = express();

app.use(bodyParser.json());

const data = [
  { name: 'Name', id: 1 },
  { name: 'Place', id: 2 },
  { name: 'Object', id: 3 },
];

app.get('/', (req, res) => {
  return res.json(data);
});

app.post('/', (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: 'The body cannot be empty' });
  } else {
    data.push(req.body);
    return res.status(200).json({ message: 'Success!', data });
  }
});

app.listen(3434);
