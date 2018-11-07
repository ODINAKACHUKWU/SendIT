const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('SendIT API Root');
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});