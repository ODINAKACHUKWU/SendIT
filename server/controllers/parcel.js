import _ from 'underscore';
import parcels from '../db';

let lastCreatedParcelId = 3;

class ParcelController {
  // GET /parcels
  static getAllParcels(req, res) {
    res.status(200).send({
      status: 'Success',
      message: 'Parcels retrieved',
      data: parcels,
    });
  }

  // GET /parcels/:id
  static getSpecificParcel(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    const matchedParcel = _.findWhere(parcels, {
      id: parcelId,
    });

    if (matchedParcel) {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel retrieved',
        data: matchedParcel,
      });
    } else {
      res.status(404).send({
        status: 'Failure',
        message: 'Parcel not found',
      });
    }
  }

  // POST /parcels
  static createParcel(req, res) {
    // Pick only these specified inputs from user
    const body = _.pick(req.body, 'sender', 'receiver', 'pickup_location', 'destination', 'item');

    // Validate user inputs
    if (!_.isString(body.sender) || !_.isString(body.receiver)
    || !_.isString(body.pickup_location) || !_.isString(body.destination)
    || !_.isString(body.item) || body.sender.trim().length === 0
    || body.receiver.trim().length === 0
    || body.pickup_location.trim().length === 0
    || body.destination.trim().length === 0 || body.item.trim().length === 0) {
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
    body.id = lastCreatedParcelId + 1;
    lastCreatedParcelId += 1;

    // Push body into array
    parcels.push(body);

    // Send user info back to user
    res.status(201).send({
      status: 'Success',
      message: 'Parcel Created',
      data: body,
    });
  }

  // DEL /parcels/:id/delete
  static deleteParcel(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    const matchedParcel = _.findWhere(parcels, {
      id: parcelId,
    });

    if (!matchedParcel) {
      res.status(404).send({
        status: 'Failure',
        message: 'Parcel not found',
      });
    } else if (matchedParcel.status === 'Not delivered') {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel is not delivered yet!',
      });
    } else if (matchedParcel.status === 'Delivered') {
      parcels = _.without(parcels, matchedParcel);
      res.status(200).send({
        status: 'Success',
        message: 'Parcel deleted',
      });
    }
  }

  // GET /users/:id/parcels/deliver
  static getSumParcelDelivered(req, res) {
    const userId = parseInt(req.params.id, 10);
    const matchedParcels = _.where(parcels, {
      user: userId,
      status: 'Delivered',
    });

    if (matchedParcels) {
      res.status(200).send({
        status: 'Success',
        message: `You have ${matchedParcels.length} parcels`,
      });
    } else {
      res.status(404).send();
    }
  }

  // PUT /parcels/:id/cancel
  static cancelParcel(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    const matchedParcel = _.findWhere(parcels, {
      id: parcelId,
    });

    if (!matchedParcel) {
      res.status(404).send({
        status: 'Failure',
        message: 'Parcel not found',
      });
    } else if (matchedParcel.status === 'Delivered') {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel has been delivered',
      });
    } else {
      matchedParcel.status = 'Cancelled';
      res.status(200).send({
        status: 'Success',
        message: 'Parcel cancelled',
        data: matchedParcel,
      });
    }
  }

  // PUT /parcels/:id/destination
  static changeDestination(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    const matchedParcel = _.findWhere(parcels, {
      id: parcelId,
    });

    if (!matchedParcel) {
      return res.status(404).send({
        status: 'failure',
        message: 'No parcel found',
      });
    }

    if (req.body.destination && matchedParcel.status === 'Delivered') {
      return res.status(400).send({
        status: 'falure',
        message: 'Parcel has been delivered',
      });
    }

    if (req.body.destination && _.isString(req.body.destination)
    && req.body.destination.trim().length > 0
    && matchedParcel.status === 'Not delivered') {
      matchedParcel.destination = req.body.destination.trim();
      return res.status(200).send({
        status: 'Success',
        message: 'Destination has been changed',
        data: matchedParcel,
      });
    }
  }
}

export default ParcelController;
