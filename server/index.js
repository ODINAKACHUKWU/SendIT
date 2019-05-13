import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import router from './routes';
import createTables from './database/migrations/createTables';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3100;

createTables();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/v1', router);

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Connection Ok',
  });
});

app.get('*', (req, res) => {
  res.status(400).send({
    status: 'Failure',
    message: 'No resources found',
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`);
});

export default app;
