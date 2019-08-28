import pool from '../configs/dbConfig';

class UserController {
  /**
   * Get all users
   * @param {object} req
   * @param {object} res
   * @returns {array} return status code 200
   */
  static getAllUsers(req, res) {
    const { decoded } = req.body;

    if (decoded.category !== 'Admin') {
      return res.status(403).send({
        status: 'Failure',
        message: 'You are not an admin',
      });
    }

    pool.query(
      'SELECT UserID, first_name, last_name, phone_number, email, category FROM users ORDER BY userId ASC',
      (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
          });
        }

        const users = results.rows;

        if (users.length === 0) {
          return res.status(200).send({
            status: 'Success',
            message: 'There is no user',
            data: users,
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Users retrieved',
          data: users,
        });
      },
    );
  }

  /**
   * Get a user
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   */
  static getUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    const { decoded } = req.body;

    if (decoded.userId !== id && decoded.category !== 'Admin') {
      return res.status(403).send({
        status: 'Failure',
        message: 'You are not an admin',
      });
    }

    pool.query(
      'SELECT UserID, first_name, last_name, phone_number, email, category FROM users WHERE userId = $1',
      [id],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
          });
        }

        const user = results.rows[0];

        if (!user) {
          return res.status(404).send({
            status: 'Failure',
            message: 'User not found',
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'User retrieved',
          data: user,
        });
      },
    );
  }

  /**
   * Update user role to Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   */
  static assignAdmin(req, res) {
    const id = parseInt(req.params.id, 10);
    const { category, decoded } = req.body;

    pool.query(
      'SELECT * FROM users WHERE userid = $1',
      [id],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
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
          if (decoded.category !== 'Admin') {
            return res.status(403).send({
              status: 'Failure',
              message: 'You are not an admin',
            });
          }

          if (decoded.userId === user.userid) {
            return res.status(403).send({
              status: 'Failure',
              message: 'You are an Admin',
            });
          }

          if (user.category === 'Admin') {
            return res.status(403).send({
              status: 'Failure',
              message: 'User is an Admin',
            });
          }

          pool.query(
            'UPDATE users SET category = $1 WHERE userid = $2 RETURNING UserID, first_name, last_name, phone_number, email, category',
            [category, id],
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  status: 'Failure',
                  message: err.message,
                });
              }

              return res.status(200).send({
                status: 'Success',
                message: "User's category has been changed to Admin",
                data: result.rows[0],
              });
            },
          );
        }
      },
    );
  }

  /**
   * Update user role to Regular
   * @param {object} req
   * @param {object} res
   * @returns {object} return status code 200
   */
  static assignRegular(req, res) {
    const id = parseInt(req.params.id, 10);
    const { category, decoded } = req.body;

    pool.query(
      'SELECT * FROM users WHERE userid = $1',
      [id],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
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
          if (decoded.category !== 'Admin') {
            return res.status(403).send({
              status: 'Failure',
              message: 'You are not an admin',
            });
          }

          if (decoded.userId === user.userid) {
            return res.status(403).send({
              status: 'Failure',
              message: 'You are not authorized to change your role!',
            });
          }

          if (user.category === 'Regular') {
            return res.status(403).send({
              status: 'Failure',
              message: 'User is a Regular',
            });
          }

          pool.query(
            'UPDATE users SET category = $1 WHERE userid = $2 RETURNING UserID, first_name, last_name, phone_number, email, category',
            [category, id],
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  status: 'Failure',
                  message: err.message,
                });
              }

              return res.status(200).send({
                status: 'Success',
                message: "User's category has been changed to Regular",
                data: result.rows[0],
              });
            },
          );
        }
      },
    );
  }
}

export default UserController;
