import db from '../configs/db';
import { userSchema, parcelSchema } from '../schemas';

const tables = [userSchema, parcelSchema];

const createTables = () => {
  tables.map(table => db.create(table));
};

createTables();
