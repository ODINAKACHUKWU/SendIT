const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
let parcels = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('SendIT API Root');
});

// GET /parcels
app.get('/parcels', (req, res) => {
    res.json(parcels);
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});