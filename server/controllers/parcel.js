import pool from '../configs/db';

class ParcelController {
  /**
   * Get all parcels
   * @param {object} req
   * @param {object} res
   * @returns {array} return status code 200
   */
  static getAllParcels(req, res) {
    const { decoded } = req.body;

    if (decoded.category !== 'Admin') {
      return res.status(403).send({
        status: 'Failure',
        message: 'You are not an admin',
      });
    }
    pool.query('SELECT * FROM parcels ORDER BY id ASC', (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcels = results.rows;

      if (parcels.length === 0) {
        return res.status(200).send({
          status: 'Success',
          message: 'There is no parcel',
          data: parcels,
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Parcels retrieved',
        data: parcels,
      });
    });
  }

  /**
   * Get a parcel
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   */
  static getParcelById(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (parcel.userid !== decoded.userId && decoded.category !== 'Admin') {
        return res.status(403).send({
          status: 'Failure',
          message: 'The parcel delivery order was not created by you',
        });
      }

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Parcel retrieved',
        data: parcel,
      });
    });
  }

  /**
   * Create a parcel delivery order
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 201
   */
  static createParcel(req, res) {
    const {
      sender,
      receiver,
      item,
      pickupLocation,
      destination,
      schedule,
      presentLocation,
      price,
      status,
      decoded,
    } = req.body;

    pool.query('INSERT INTO parcels (userid, sender, receiver, item, pickup_location, destination, schedule, present_location, price, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [decoded.userId, sender, receiver, item,
        pickupLocation, destination, schedule, presentLocation, price,
        status], (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
          });
        }
        return res.status(201).send({
          status: 'Success',
          message: 'Parcel created',
          data: results.rows[0],
        });
      });
  }

  /**
   * Delete a parcel
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 200
   */
  static deleteParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }

      if (parcel) {
        if (parcel.userid !== decoded.userId) {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery order was not created by you',
          });
        }

        if (parcel.order_status === 'Not delivered') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has not been delivered',
          });
        }

        pool.query('DELETE FROM parcels WHERE id = $1 RETURNING *', [id], (err, result) => {
          if (err) {
            return res.status(500).send({
              status: 'Failure',
              message: err.message,
            });
          }

          const parcelId = result.rows[0].id;

          return res.status(200).send({
            status: 'Success',
            message: `Parcel with id: ${parcelId} has been deleted`,
          });
        });
      }
    });
  }

  /**
   * Get parcels by a user
   * @param {object} req
   * @param {object} res
   * @returns {array} return status code 200
   */
  static getAllParcelsByAUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM users WHERE userid = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).send({
          status: 'Failure',
          message: err.message,
        });
      }

      const user = results.rows[0];

      if (!user) {
        return res.status(404).send({
          status: 'Failure',
          message: 'User not found',
        });
      }

      if (user) {
        if (id !== decoded.userId && decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery orders were not created by you',
          });
        }

        pool.query('SELECT * FROM parcels WHERE userid = $1', [id], (error, result) => {
          if (error) {
            return res.status(500).send({
              status: 'Failure',
              message: error.message,
            });
          }

          const parcels = result.rows;

          if (parcels.length === 0) {
            return res.status(200).send({
              status: 'Success',
              message: 'There is no parcel',
              data: parcels,
            });
          }
          return res.status(200).send({
            status: 'Success',
            message: 'Parcels retrieved',
            data: parcels,
          });
        });
      }
    });
  }

  /**
   * Update Parcel order destination
   * @param {object}
   * @param {object}
   * @returns {object} return status code 200
   *  */
  static changeDestination(req, res) {
    const id = parseInt(req.params.id, 10);
    const { destination, decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }

      if (parcel) {
        if (parcel.userid !== decoded.userId) {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery order was not created by you',
          });
        }

        if (parcel.order_status === 'Delivered') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been delivered',
          });
        }

        if (parcel.order_status === 'Cancelled') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been cancelled',
          });
        }

        pool.query(
          'UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *',
          [destination, id],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                status: 'Failure',
                message: err.message,
              });
            }

            return res.status(200).send({
              status: 'Success',
              message: 'Destination has been changed',
              data: result.rows[0],
            });
          },
        );
      }
    });
  }

  /**
   * Cancel Parcel order
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   */
  static cancelParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    const { status, decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }

      if (parcel) {
        if (parcel.userid !== decoded.userId) {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery order was not created by you',
          });
        }

        if (parcel.order_status === 'Delivered') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been delivered',
          });
        }

        if (parcel.order_status === 'Cancelled') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been cancelled',
          });
        }

        pool.query(
          'UPDATE parcels SET order_status = $1 WHERE id = $2 RETURNING *',
          [status, id],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                status: 'Failure',
                message: err.message,
              });
            }

            return res.status(200).send({
              status: 'Success',
              message: 'Parcel has been cancelled',
              data: result.rows[0],
            });
          },
        );
      }
    });
  }

  /**
   * Update Parcel order status
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   *  */
  static changeStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const { status, decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }

      if (parcel) {
        if (decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'You are not an admin',
          });
        }

        if (parcel.order_status === 'Delivered') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been delivered',
          });
        }

        if (parcel.order_status === 'Cancelled') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been cancelled',
          });
        }

        pool.query(
          'UPDATE parcels SET order_status = $1 WHERE id = $2 RETURNING *',
          [status, id],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                status: 'Failure',
                message: err.message,
              });
            }

            return res.status(200).send({
              status: 'Success',
              message: 'Status has been changed',
              data: result.rows[0],
            });
          },
        );
      }
    });
  }

  /**
   * Update Parcel order location
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   *  */
  static changeLocation(req, res) {
    const id = parseInt(req.params.id, 10);
    const { location, decoded } = req.body;

    pool.query('SELECT * FROM parcels WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const parcel = results.rows[0];

      if (!parcel) {
        return res.status(404).send({
          status: 'Failure',
          message: 'Parcel not found',
        });
      }

      if (parcel) {
        if (decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'You are not an admin',
          });
        }

        if (parcel.order_status === 'Delivered') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been delivered',
          });
        }

        if (parcel.order_status === 'Cancelled') {
          return res.status(403).send({
            status: 'Failure',
            message: 'Parcel has been cancelled',
          });
        }

        pool.query(
          'UPDATE parcels SET present_location = $1 WHERE id = $2 RETURNING *',
          [location, id],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                status: 'Failure',
                message: err.message,
              });
            }

            return res.status(200).send({
              status: 'Success',
              message: 'Location has been changed',
              data: result.rows[0],
            });
          },
        );
      }
    });
  }

  /**
   * Get sum of a user's delivered parcels
   * @param {object} req
   * @param {object} res
   * @returns {number} return status code 200
   */
  static getTotalParcelsByAUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM users WHERE userid = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).send({
          status: 'Failure',
          message: err.message,
        });
      }

      const user = results.rows[0];

      if (!user) {
        return res.status(404).send({
          status: 'Failure',
          message: 'User not found',
        });
      }

      if (user) {
        if (id !== decoded.userId && decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery orders were not created by you',
          });
        }

        pool.query('SELECT * FROM parcels WHERE userid = $1', [id], (error, result) => {
          if (error) {
            return res.status(500).send({
              status: 'Failure',
              message: error.message,
            });
          }

          const parcels = result.rows;

          return res.status(200).send({
            status: 'Success',
            message: 'Total number of parcels retrieved',
            data: parcels.length,
          });
        });
      }
    });
  }

  /**
   * Get sum of user's delivered parcels
   * @param {object} req
   * @param {object} res
   * @returns {number} return status code 200
   */
  static getTotalParcelsDelivered(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM users WHERE userid = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).send({
          status: 'Failure',
          message: err.message,
        });
      }

      const user = results.rows[0];

      if (!user) {
        return res.status(404).send({
          status: 'Failure',
          message: 'User not found',
        });
      }

      if (user) {
        if (id !== decoded.userId && decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery orders were not created by you',
          });
        }

        pool.query('SELECT * FROM parcels WHERE userid = $1', [id], (error, result) => {
          if (error) {
            return res.status(500).send({
              status: 'Failure',
              message: error.message,
            });
          }

          const parcels = result.rows;
          const deliveredParcels = parcels.filter(parcel => parcel.order_status === 'Delivered');

          return res.status(200).send({
            status: 'Success',
            message: 'Total number of delivered parcels retrieved',
            data: deliveredParcels.length,
          });
        });
      }
    });
  }

  /**
   * Get sum of user's pending parcels
   * @param {object} req
   * @param {object} res
   * @returns {number} return status code 200
   */
  static getTotalParcelsNotDelivered(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    pool.query('SELECT * FROM users WHERE userid = $1', [id], (err, results) => {
      if (err) {
        return res.status(500).send({
          status: 'Failure',
          message: err.message,
        });
      }

      const user = results.rows[0];

      if (!user) {
        return res.status(404).send({
          status: 'Failure',
          message: 'User not found',
        });
      }

      if (user) {
        if (id !== decoded.userId && decoded.category !== 'Admin') {
          return res.status(403).send({
            status: 'Failure',
            message: 'The parcel delivery orders were not created by you',
          });
        }

        pool.query('SELECT * FROM parcels WHERE userid = $1', [id], (error, result) => {
          if (error) {
            return res.status(500).send({
              status: 'Failure',
              message: error.message,
            });
          }

          const parcels = result.rows;
          const pendingParcels = parcels.filter(parcel => parcel.order_status === 'Not delivered');

          return res.status(200).send({
            status: 'Success',
            message: 'Total number of pending parcels retrieved',
            data: pendingParcels.length,
          });
        });
      }
    });
  }
}

export default ParcelController;
