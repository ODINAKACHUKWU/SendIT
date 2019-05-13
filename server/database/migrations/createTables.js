import db from '../configs/db';
import { userSchema, parcelSchema } from '../schemas';

const tables = [userSchema, parcelSchema];

const createTables = () => {
  tables.forEach((table) => {
    db.create(table);
  });
};

export default createTables;
