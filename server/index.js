import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './routes';

const app = express();
const PORT = process.env.PORT || 3100;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api/v1', router);

app.get('/api/v1', (req, res) => {
  res.send('SendIT API Root');
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`);
});

export default app;
