import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import router from './routes';
import createTables from './database/migrations/createTables';
import db from './configs/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3100;
const isTest = process.env.NODE_ENV === 'test';

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
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

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Connected to SendIT v1 API',
  });
});

app.get('*', (req, res) => {
  res.status(400).json({
    status: 'Failure',
    message: 'Oops! Not found',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}...`);
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
