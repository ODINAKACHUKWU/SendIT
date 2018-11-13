import _ from 'underscore';
import { users, parcels } from '../db';

class UserController {
  // GET /users
  static getAllUsers(req, res) {
    res.json(users);
  }

  // GET /users/:id
  static getSpecificUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    const matchedUser = _.findWhere(users, {
      id: userId,
    });

    if (matchedUser) {
      res.json(matchedUser);
    } else {
      res.status(404).send();
    }
  }

  // GET /users/:id/parcels
  static getUserParcels(req, res) {
    const userId = parseInt(req.params.id, 10);
    const matchedParcels = _.where(parcels, {
      user: userId,
    });

    if (matchedParcels) {
      res.json(matchedParcels);
    } else {
      res.status(404).send();
    }
  }
}

export default UserController;
