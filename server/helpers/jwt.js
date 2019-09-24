import jwt from 'jsonwebtoken';

export default {
  generateToken: (payload, configs) => {
    const { secret, ...options } = configs;
    try {
      return jwt.sign(payload, secret, options);
    } catch (error) {
      throw Error(error);
    }
  },

  decodeToken: (token, configs) => {
    const { secret, ...options } = configs;
    try {
      return jwt.verify(token, secret, options);
    } catch (error) {
      throw Error(error);
    }
  },
};
