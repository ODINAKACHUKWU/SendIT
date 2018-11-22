import jwt from 'jsonwebtoken';
import pool from '../db';

const AuthenticateUser = {

  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        status: 'Failure',
        message: 'Token is not provided',
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    pool.query('SELECT * FROM users WHERE userid = $1', [decoded.userId], (error, results) => {
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
          message: 'The token you provided is invalid',
        });
      }

      req.body.decoded = decoded;
      next();
    });
  },
};

export default AuthenticateUser;
