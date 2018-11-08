const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
const v1 = '/api/v1';
let parcels = [{
	"sender": "Solomon Wilson    ",
	"receiver": "Kelvin",
	"pickup_location": "12 Lagoon Street",
	"destination": "4 Agip Street",
    "item": "CD",
    "status": "Delivered",
    "id": 0
}];
let users = [];
let parcelNextId = 1;
let userNextId = 1;

// Parcel props
// {
//     sender,
//     receiver,
//     pickup_location,
//     destination,
//     item,
//     status,
//     id
// }

// User props
// {
//     name,
//     phone_number,
//     email,
//     password,
//     id
// }

app.use(bodyParser.json());

app.get(v1, (req, res) => {
    res.send('SendIT API Root');
});

// DELETE /parcels/:id
app.delete(`${v1}/parcels/:id/delete`, (req, res) => {
    let parcelId = parseInt(req.params.id, 10);
    let matchedParcel = _.findWhere(parcels, {
        id: parcelId
    });
    let body = _.pick(matchedParcel, 'status');

    if (!matchedParcel) {
        res.status(404).json(`error: no parcel found with id ${parcelId}`);
    } else if (body.status === "Not delivered") {
        res.status(401).json("Parcel is not delivered yet!");
    } else if (body.status === "Delivered") {
        parcels = _.without(parcels, matchedParcel);
        res.json(`Parcel with id: ${parcelId} deleted!`);
    }
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

// GET /users/:id
app.get(`${v1}/users/:id`, (req, res) => {
    let userId = parseInt(req.params.id, 10);
    let matchedUser = _.findWhere(users, {
        id: userId
    });

    if (matchedUser) {
        res.json(matchedUser);
    } else {
        res.status(404).send();
    }
});

// GET /parcels
app.get(`${v1}/parcels`, (req, res) => {
    res.json(parcels);
});

// GET /users
app.get(`${v1}/users`, (req, res) => {
    res.json(users);
});

// POST /parcels
app.post(`${v1}/parcels`, (req, res) => {
    // Pick only these specified inputs from user
    let body = _.pick(req.body, 'sender', 'receiver', 'pickup_location', 'destination', 'item');

    // Validate user inputs
    if (!_.isString(body.sender) || !_.isString(body.receiver) || !_.isString(body.pickup_location) || !_.isString(body.destination) || !_.isString(body.item) || body.sender.trim().length === 0 || body.receiver.trim().length === 0 || body.pickup_location.trim().length === 0 || body.destination.trim().length === 0 || body.item.trim().length === 0) {
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
    res.status(201).json(body);
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});