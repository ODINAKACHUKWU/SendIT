import { parcels } from '../db';

let lastCreatedParcelId = parcels.length;

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
    let matchedParcel;

    parcels.forEach((parcel) => {
      if (parcel.id === parcelId) {
        matchedParcel = parcel;
      }
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
    const parcel = {
      sender: req.body.sender,
      receiver: req.body.receiver,
      pickupLocation: req.body.pickupLocation,
      destination: req.body.destination,
      item: req.body.item,
      user: req.body.user,
    };
    const {
      sender, receiver, pickupLocation, destination, item, user,
    } = parcel;

    // Validate user inputs
    if (!isNaN(sender) || !isNaN(receiver)
    || !isNaN(pickupLocation) || !isNaN(destination)
    || !isNaN(item) || sender.trim().length === 0
    || receiver.trim().length === 0
    || pickupLocation.trim().length === 0
    || destination.trim().length === 0 || item.trim().length === 0
    || typeof (user) !== 'number') {
      return res.status(400).send({
        status: 'Failure',
        message: 'Invalid input',
      });
    }

    // Remove spaces around user inputs
    parcel.sender = sender.trim();
    parcel.receiver = receiver.trim();
    parcel.pickupLocation = pickupLocation.trim();
    parcel.destination = destination.trim();
    parcel.item = item.trim();

    // Add location field
    parcel.location = pickupLocation.trim();

    // Add status field to the object
    parcel.status = 'Not delivered';

    // Add id field to the object
    parcel.id = lastCreatedParcelId + 1;
    lastCreatedParcelId += 1;

    // Push body into array
    parcels.push(parcel);

    // Send user info back to user
    res.status(201).send({
      status: 'Success',
      message: 'Parcel Created',
      data: parcel,
    });
  }

  // GET /users/:id/parcels/deliver
  static getSumParcelDelivered(req, res) {
    const userId = parseInt(req.params.id, 10);
    const userParcels = parcels.filter(orders => orders.user === userId);
    const matchedParcels = [];

    userParcels.forEach((parcel) => {
      if (parcel.status === 'Delivered') {
        matchedParcels.push(parcel);
      }
    });

    if (userParcels.length === 0) {
      res.status(404).send({
        status: 'Failure',
        message: 'User not found',
      });
    } else if (userParcels) {
      res.status(200).send({
        status: 'Success',
        message: 'Total parcel retrieved',
        data: matchedParcels.length,
      });
    }
  }

  // PUT /parcels/:id/cancel
  static cancelParcel(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    let matchedParcel;

    parcels.forEach((parcel) => {
      if (parcel.id === parcelId) {
        matchedParcel = parcel;
      }
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
    } else if (matchedParcel.status === 'Cancelled') {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel has been cancelled',
      });
    } else {
      matchedParcel.status = 'Cancelled';
      res.status(200).send({
        status: 'Success',
        message: 'Parcel is cancelled',
        data: matchedParcel,
      });
    }
  }

  // PUT /parcels/:id/destination
  static changeDestination(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    let matchedParcel;
    const body = { destination: req.body.destination };
    const { destination } = body;

    parcels.forEach((parcel) => {
      if (parcel.id === parcelId) {
        matchedParcel = parcel;
      }
    });

    if (!matchedParcel) {
      return res.status(404).send({
        status: 'Failure',
        message: 'No parcel found',
      });
    }

    if (destination && matchedParcel.status === 'Delivered') {
      return res.status(200).send({
        status: 'Success',
        message: 'Parcel has been delivered',
      });
    }

    if (destination && typeof (destination) === 'string'
    && destination.trim().length > 0
    && matchedParcel.status === 'Not delivered') {
      matchedParcel.destination = destination.trim();
      return res.status(200).send({
        status: 'Success',
        message: 'Destination has been changed',
        data: matchedParcel,
      });
    }
  }
}

export default ParcelController;
