import { Pool } from 'pg';
import config from './config';

let option;

if (process.env.NODE_ENV === 'test') {
  option = config.test;
} else if (process.env.NODE_ENV === 'development') {
  option = config.dev;
} else if (process.env.NODE_ENV === 'production') {
  option = config.production;
}

const pool = new Pool(option);

export default pool;
