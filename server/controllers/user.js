import jwt from 'jsonwebtoken';
import pool from '../configs/db';
import { hashPassword, comparePassword } from '../helpers/password';

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
   * Create a user account
   * @param {object} req
   * @param {object} res
   * @returns {string} return status code 201
   */
  static async registerUser(req, res) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      category,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
          });
        }

        const account = results.rows[0];

        if (account) {
          return res.status(400).send({
            status: 'Failure',
            message: `Account with the email address: ${email} already exist`,
          });
        }

        pool.query(
          'INSERT INTO users (first_name, last_name, phone_number, email, pass_word, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [firstName, lastName, phoneNumber, email, hashedPassword, category],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                status: 'Failure',
                message: err.message,
              });
            }

            const user = result.rows[0];
            const token = jwt.sign(
              {
                userId: user.userid,
                category: user.category,
                fullName: `${user.first_name} ${user.last_name}`,
              },
              process.env.JWT_SECRET,
              { expiresIn: '3d' },
            );

            res.status(201).send({
              status: 'Success',
              message: `Account created for ${firstName} ${lastName}`,
              token,
            });
          },
        );
      },
    );
  }

  /**
   * Log in a user
   * @param {object} req
   * @param {object} res
   * @returns {string} return status code 200
   */
  static loginUser(req, res) {
    const { email, password } = req.body;

    pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      async (error, results) => {
        if (error) {
          return res.status(500).send({
            status: 'Failure',
            message: error.message,
          });
        }

        const user = results.rows[0];

        if (!user) {
          return res.status(400).send({
            status: 'Failure',
            message: 'Invalid credentials',
          });
        }

        if (user) {
          const isUser = await comparePassword(password, user.pass_word);
          if (!isUser) {
            return res.status(400).send({
              status: 'Failure',
              message: 'Invalid credentials',
            });
          }

          if (isUser) {
            const token = jwt.sign(
              {
                userId: user.userid,
                category: user.category,
                fullName: `${user.first_name} ${user.last_name}`,
              },
              process.env.JWT_SECRET,
              { expiresIn: '3d' },
            );

            return res.status(200).send({
              status: 'Success',
              message: `${user.first_name} ${user.last_name} is Logged in`,
              token,
            });
          }
        }
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
