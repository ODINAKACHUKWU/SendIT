import jwt from 'jsonwebtoken';
import pool from '../configs/dbConfig';

const AuthenticateUser = {

  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 'Failure',
        message: 'Token is not provided',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          status: 'Failure',
          message: 'Invalid token provided',
        });
      }

      pool.query('SELECT * FROM users WHERE userid = $1', [decoded.userId],
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: 'Failure',
              message: err.message,
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
    });
  },
};

export default AuthenticateUser;
