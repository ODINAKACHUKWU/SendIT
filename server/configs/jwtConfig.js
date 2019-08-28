import dotenv from 'dotenv';

dotenv.config();

const {
  JWT_ISSUER,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
} = process.env;

const configs = {
  issuer: JWT_ISSUER,
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRY_TIME,
};

export default configs;
