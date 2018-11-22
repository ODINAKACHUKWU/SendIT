import jwt from 'jsonwebtoken';
import pool from '../db';

class UserController {
  static getAllUsers(req, res) {
    pool.query('SELECT UserID, first_name, last_name, phone_number, email, category FROM users ORDER BY userId ASC', (error, results) => {
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
    });
  }

  static getUserById(req, res) {
    const id = parseInt(req.params.id, 10);

    pool.query('SELECT UserID, first_name, last_name, phone_number, email, category FROM users WHERE userId = $1', [id], (error, results) => {
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
    });
  }

  static registerUser(req, res) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      category,
    } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        return res.status(500).send({
          status: 'Failure',
          message: error.message,
        });
      }

      const user = results.rows[0];

      if (user) {
        return res.status(400).send({
          status: 'Failure',
          message: `Account with the email address: ${email} already exist`,
        });
      }

      pool.query('INSERT INTO users (first_name, last_name, phone_number, email, pass_word, category) VALUES ($1, $2, $3, $4, $5, $6)',
        [firstName, lastName, phoneNumber, email, password,
          category], () => res.status(201).send({
          status: 'Success',
          message: 'Account created',
        }));
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
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
          message: 'User not found',
        });
      }

      if (user && user.pass_word !== password) {
        return res.status(400).send({
          status: 'Failure',
          message: 'Wrong password',
        });
      }

      if (user && user.pass_word === password) {
        const token = jwt.sign({
          userId: user.userid,
          category: user.category,
        },
        process.env.SECRET, { expiresIn: '3d' });

        return res.status(200).send({
          status: 'Success',
          message: `${user.first_name} ${user.last_name} is Logged in`,
          data: token,
        });
      }
    });
  }
}

export default UserController;
