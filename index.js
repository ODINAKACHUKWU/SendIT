const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
const v1 = '/api/v1';
let parcels = [];
let parcelNextId = 1

app.use(bodyParser.json());

app.get(v1, (req, res) => {
    res.send('SendIT API Root');
});

// GET /parcels/:id
app.get(`${v1}/parcels/:id`, (req, res) => {
    let parcelId = parseInt(req.params.id, 10);
    let matchedParcel = _.findWhere(parcels, {
        id: parcelId
    });

    if (matchedParcel) {
        res.json(matchedParcel);
    } else {
        res.status(404).send();
    }
});

// GET /parcels
app.get(`${v1}/parcels`, (req, res) => {
    res.json(parcels);
});

// POST /parcels
app.post(`${v1}/parcels`, (req, res) => {
    // Pick only these specified inputs from user
    let body = _.pick(req.body, 'sender', 'receiver', 'pickup_location', 'destination', 'item');

    // Validate user inputs
    if (!_.isString(body.sender, body.receiver, body.pickup_location, body.destination, body.item) || body.sender.trim().length === 0 || body.receiver.trim().length === 0 || body.pickup_location.trim().length === 0 || body.destination.trim().length === 0 || body.item.trim().length === 0) {
        return res.status(400).send();
    }

    // Remove spaces around user inputs
    body.sender = body.sender.trim();
    body.receiver = body.receiver.trim();
    body.pickup_location = body.pickup_location.trim();
    body.destination = body.destination.trim();
    body.item = body.item.trim();

    // Add status field to the object
    body.status = "Not delivered";

    // Add id field to the object
    body.id = parcelNextId++;

    // Push body into array
    parcels.push(body);

    // Send user info back to user
    res.json(body);
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});