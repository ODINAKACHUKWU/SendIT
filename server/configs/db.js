import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
const { DEV_DATABASE_URL, DATABASE_URL, TEST_DATABASE_URL } = process.env;

if (process.env.NODE_ENV === 'test') {
  connectionString = TEST_DATABASE_URL;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = DATABASE_URL;
} else {
  connectionString = DEV_DATABASE_URL;
}

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
  on: (text, callback) => pool.on(text, callback),
  connection: () => pool.connect(),
  end: () => pool.end(),
};
