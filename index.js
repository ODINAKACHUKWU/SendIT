const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
const v1 = '/api/v1';
let parcels = [{
  sender: 'Solomon Wilson',
  receiver: 'Kelvin',
  pickup_location: '12 Lagoon Street',
  destination: '4 Agip Street',
  item: 'CD',
  status: 'Delivered',
  id: 1,
  user: 0,
},
{
  sender: 'Adam Smith',
  receiver: 'Bright',
  pickup_location: '12 Lagoon Street',
  destination: '4 Agip Street',
  item: 'CD',
  status: 'Delivered',
  id: 2,
  user: 1,
},
{
  sender: 'Adam Smith',
  receiver: 'Emeka',
  pickup_location: '12 Lagoon Street',
  destination: '4 Agip Street',
  item: 'CD',
  status: 'Delivered',
  id: 3,
  user: 1,
},
];
const users = [];
let parcelNextId = 1;

app.use(bodyParser.json());

app.get(v1, (req, res) => {
  res.send('SendIT API Root');
});

// DELETE /parcels/:id
app.delete(`${v1}/parcels/:id/delete`, (req, res) => {
  const parcelId = parseInt(req.params.id, 10);
  const matchedParcel = _.findWhere(parcels, {
    id: parcelId,
  });
  const body = _.pick(matchedParcel, 'status');

  if (!matchedParcel) {
    res.status(404).json(`error: no parcel found with id ${parcelId}`);
  } else if (body.status === 'Not delivered') {
    res.status(401).json('Parcel is not delivered yet!');
  } else if (body.status === 'Delivered') {
    parcels = _.without(parcels, matchedParcel);
    res.json(`Parcel with id: ${parcelId} deleted!`);
  }
});

// PUT /parcels/:id/destination
app.put(`${v1}/parcels/:id/destination`, (req, res) => {
  const parcelId = parseInt(req.params.id, 10);
  const matchedParcel = _.findWhere(parcels, {
    id: parcelId,
  });
  const body = _.pick(req.body, 'destination');
  const validAttribute = {};

  if (!matchedParcel) {
    return res.status(404).send();
  }

  if (body.hasOwnProperty('destination') && _.isString(body.destination) && body.destination.trim().length > 0 && matchedParcel.status === 'Not delivered') {
    validAttribute.destination = body.destination;
  } else if (body.hasOwnProperty('destination') && matchedParcel.status === 'Delivered') {
    return res.status(400).send('Parcel delivered');
  }

  validAttribute.destination = validAttribute.destination.trim();

  _.extend(matchedParcel, validAttribute);
  res.json(matchedParcel);
});

// PUT /parcels/:id/cancel
app.put(`${v1}/parcels/:id/cancel`, (req, res) => {
  const parcelId = parseInt(req.params.id, 10);
  const matchedParcel = _.findWhere(parcels, {
    id: parcelId,
  });
  const validAttribute = {};

  if (!matchedParcel) {
    return res.status(404).send();
  }
  if (matchedParcel.status === 'Not delivered') {
    validAttribute.status = 'Cancelled';
  }

  _.extend(matchedParcel, validAttribute);
  res.json(matchedParcel);
});

// GET /users/:id/parcels/deliver
app.get(`${v1}/users/:id/parcels/deliver`, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const matchedParcels = _.where(parcels, {
    user: userId,
    status: 'Delivered',
  });

  if (matchedParcels) {
    res.json(matchedParcels.length);
  } else {
    res.status(404).send();
  }
});

// GET /parcels/:id
app.get(`${v1}/parcels/:id`, (req, res) => {
  const parcelId = parseInt(req.params.id, 10);
  const matchedParcel = _.findWhere(parcels, {
    id: parcelId,
  });

  if (matchedParcel) {
    res.json(matchedParcel);
  } else {
    res.status(404).send();
  }
});

// GET /users/:id/parcels
app.get(`${v1}/users/:id/parcels`, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const matchedParcels = _.where(parcels, {
    user: userId,
  });

  if (matchedParcels) {
    res.json(matchedParcels);
  } else {
    res.status(404).send();
  }
});

// GET /users/:id
app.get(`${v1}/users/:id`, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const matchedUser = _.findWhere(users, {
    id: userId,
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
  const body = _.pick(req.body, 'sender', 'receiver', 'pickup_location', 'destination', 'item');

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
  body.status = 'Not delivered';

  // Add id field to the object
  body.id = parcelNextId += 1;

  // Push body into array
  parcels.push(body);

  // Send user info back to user
  res.status(201).json(body);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`);
});
