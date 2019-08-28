import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { httpResponse } from './helpers/http';
// import path from 'path';

import router from './routes';
import createTables from './database/migrations/createTables';
import db from './configs/dbConfig';

dotenv.config();

const app = express();
const port = process.env.PORT || 3100;
const isTest = process.env.NODE_ENV === 'test';

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

// uncomment after refactoring the client folder
// app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to SendIT</h1>
            <h3>SendIT is a courier service that helps users deliver parcels to different destinations.
            It provides courier quotes based on weight categories.</h3>
            <p>For any more information please visit our
            <a href='https://github.com/ODINAKACHUKWU/SendIT'>
            Github repo!</a></p>
            <h4>Thank you for visiting  &#x1F600;</h4>
            `);
});

app.get('/api/v1', (req, res) => httpResponse(res, {
  statusCode: 200,
  status: 'success',
  message: 'Connected to SendIT v1 API',
}));

app.get('*', (req, res) => httpResponse(res, {
  statusCode: 400,
  status: 'failure',
  message: 'Oops! Not found',
}));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}...`);
});

if (!isTest) {
  (async () => {
    try {
      const connect = await db.connection();
      if (connect) {
        // eslint-disable-next-line no-console
        console.log('Connected to database...');
        createTables();
      }
    } catch (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
  })().catch(err => console.error(err.stack));
}

export default app;
