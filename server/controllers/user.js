import _ from 'underscore';
import { users, parcels } from '../db';

let lastCreatedUserId = users.length;

class UserController {
  // GET /users
  static getAllUsers(req, res) {
    res.status(200).send({
      status: 'Success',
      message: 'Users retrieved',
      data: users,
    });
  }

  // GET /users/:id
  static getSpecificUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    let matchedUser;

    users.forEach((user) => {
      if (user.id === userId) {
        matchedUser = user;
      }
    });

    if (matchedUser) {
      res.status(200).send({
        status: 'Success',
        message: 'User retrieved',
        data: matchedUser,
      });
    } else {
      res.status(404).send({
        status: 'Failure',
        message: 'User not found',
      });
    }
  }

  // GET /users/:id/parcels
  static getUserParcels(req, res) {
    const userId = parseInt(req.params.id, 10);
    const matchedParcels = [];

    parcels.forEach((parcel) => {
      if (parcel.user === userId) {
        matchedParcels.push(parcel);
      }
    });

    if (matchedParcels.length > 0) {
      res.status(200).send({
        status: 'Success',
        message: "User's parcels retrieved",
        data: matchedParcels,
      });
    } else {
      res.status(200).send({
        status: 'Success',
        message: 'User has no parcels',
      });
    }
  }

  // POST /users
  static addUserAccount(req, res) {
    // Pick only these specified inputs from user
    const body = _.pick(req.body, 'firstName', 'lastName', 'phoneNumber', 'email', 'password');
    const {
      firstName, lastName, phoneNumber, email, password,
    } = body;

    // Validate user inputs
    if (!_.isString(firstName) || !_.isString(lastName)
    || !_.isNumber(phoneNumber) || !_.isString(email)
    || !_.isString(password) || firstName.trim().length === 0
    || lastName.trim().length === 0
    || phoneNumber.length === 0
    || email.trim().length === 0 || password.trim().length === 0) {
      return res.status(400).send();
    }

    // Remove spaces around user inputs
    body.sender = firstName.trim();
    body.receiver = lastName.trim();
    body.destination = email.trim();
    body.item = password.trim();

    // Add id field to the object
    body.id = lastCreatedUserId + 1;
    lastCreatedUserId += 1;

    // Push body into array
    users.push(body);

    // Send user info back to user
    res.status(201).send({
      status: 'Success',
      message: 'Account Created',
      data: body,
    });
  }

  // PUT /parcels/:id/deliver
  static changeStatus(req, res) {
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
    } else if (matchedParcel.status === 'Not delivered') {
      matchedParcel.status = 'Delivered';
      res.status(200).send({
        status: 'Success',
        message: 'Status changed',
        data: matchedParcel,
      });
    }
  }

  // PUT /parcels/:id/location
  static changeLocation(req, res) {
    const parcelId = parseInt(req.params.id, 10);
    const matchedParcel = _.findWhere(parcels, {
      id: parcelId,
    });

    if (!matchedParcel) {
      res.status(404).send({
        status: 'failure',
        message: 'No parcel found',
      });
    }

    if (matchedParcel.status === 'Delivered') {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel has been delivered',
      });
    } else if (matchedParcel.status === 'Cancelled') {
      res.status(200).send({
        status: 'Success',
        message: 'Parcel has been cancelled',
      });
    }

    if (req.body.location && _.isString(req.body.location)
    && req.body.location.trim().length > 0
    && matchedParcel.status === 'Not delivered') {
      matchedParcel.location = req.body.location.trim();
      res.status(200).send({
        status: 'Success',
        message: 'Location has been changed',
        data: matchedParcel,
      });
    }
  }
}

export default UserController;
