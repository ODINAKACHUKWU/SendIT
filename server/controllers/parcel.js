import pool from '../db';

class ParcelController {
  static getAllParcels(req, res) {
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

  static getParcelById(req, res) {
    const id = parseInt(req.params.id, 10);

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
      return res.status(200).send({
        status: 'Success',
        message: 'Parcel retrieved',
        data: parcel,
      });
    });
  }

  static createParcel(req, res) {
    const {
      sender,
      reciever,
      item,
      pickupLocation,
      destination,
      schedule,
      presentLocation,
      price,
      status,
      decoded,
    } = req.body;

    pool.query('INSERT INTO parcels (userid, sender, reciever, item, pickup_location, destination, schedule, present_location, price, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [decoded.userId, sender, reciever, item,
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
   * only user who created the parcel can change the destination
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

      if (parcel.userid !== decoded.userId) {
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

      if (parcel.order_status === 'Delivered') {
        return res.status(403).send({
          status: 'Failure',
          message: 'Parcel has been delivered',
        });
      }

      pool.query(
        'UPDATE parcels SET destination = $1 WHERE id = $2',
        [destination, id],
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: 'Failure',
              message: err.message,
            });
          }

          const updatedParcel = results.rows[0];

          return res.status(200).send({
            status: 'Success',
            message: 'Destination has been changed',
            data: updatedParcel,
          });
        },
      );
    });
  }

  /**
   * only admin can change the status to delivered
   *  */
  static changeStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const { status, decoded } = req.body;

    console.log(decoded, '-----------------------');

    if (decoded.category !== 'Admin') {
      return res.status(403).send({
        status: 'Failure',
        message: 'You are not an admin',
      });
    }

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

      if (parcel.order_status === 'Delivered') {
        return res.status(403).send({
          status: 'Failure',
          message: 'Parcel has been delivered',
        });
      }

      pool.query(
        'UPDATE parcels SET order_status = $1 WHERE id = $2 RETURNING *',
        [status, id],
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: 'Failure',
              message: err.message,
            });
          }

          const updatedParcel = results.rows[0];
          console.log(updatedParcel, '--------------');

          // if (!parcel) {
          //   return res.status(404).send({
          //     status: 'Failure',
          //     message: 'Parcel not found',
          //   });
          // }

          //   return res.status(200).send({
          //     status: 'Success',
          //     message: 'Status has been changed',
          //     data: parcel,
          //   });
          //   // },
          // );
        },
      );
    });
  }

  // only admin can change the location
  static changeLocation(req, res) {
    const id = parseInt(req.params.id, 10);
    const { location, decoded } = req.body;

    console.log(decoded, '-----------------------');

    if (decoded.category !== 'Admin') {
      return res.status(403).send({
        status: 'Failure',
        message: 'You are not an admin',
      });
    }

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

      if (parcel.order_status === 'Delivered') {
        return res.status(403).send({
          status: 'Failure',
          message: 'Parcel has been delivered',
        });
      }

      pool.query(
        'UPDATE parcels SET present_location = $1 WHERE id = $2 RETURNING *',
        [location, id],
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: 'Failure',
              message: err.message,
            });
          }

          const updatedParcel = results.rows[0];
          console.log(updatedParcel, '--------------');

          // if (!parcel) {
          //   return res.status(404).send({
          //     status: 'Failure',
          //     message: 'Parcel not found',
          //   });
          // }

          //   return res.status(200).send({
          //     status: 'Success',
          //     message: 'Status has been changed',
          //     data: parcel,
          //   });
          //   // },
          // );
        },
      );
    });



    //   const id = parseInt(req.params.id, 10);
    //   const { location } = req.body;

    //   pool.query(
    //     'UPDATE parcels SET present_location = $1 WHERE id = $2',
    //     [location, id],
    //     (error, results) => {
    //       if (error) {
    //         return res.status(500).send({
    //           status: 'Failure',
    //           message: error.message,
    //         });
    //       }

    //       const parcel = results.rows[0];

    //       if (!parcel) {
    //         return res.status(404).send({
    //           status: 'Failure',
    //           message: 'Parcel not found',
    //         });
    //       }

  //       return res.status(200).send({
  //         status: 'Success',
  //         message: 'Location has been changed',
  //         data: parcel,
  //       });
  //     },
  //   );
  // }
  }
}

export default ParcelController;
