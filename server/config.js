import dotenv from 'dotenv';

dotenv.config();

const config = {
  test: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DEV,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  dev: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DEV,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  production: {
    database_url: process.env.DATABASE_URL,
  },
};

export default config;
