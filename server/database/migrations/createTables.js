/* eslint-disable no-console */
import db from '../../configs/dbConfig';
import { userSchema, parcelSchema } from '../schemas';
import getTableName from '../../helpers/migration';

const user = `CREATE TABLE IF NOT EXISTS ${userSchema}`;
const parcel = `CREATE TABLE IF NOT EXISTS ${parcelSchema}`;

const createTables = async () => {
  try {
    const userTable = await db.query(user);
    if (userTable) {
      getTableName(userSchema);
      const parcelTable = await db.query(parcel);
      if (parcelTable) {
        getTableName(parcelSchema);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default createTables;
