/* eslint-disable no-console */
import db from '../../configs/db';
import { userSchema, parcelSchema } from '../schemas';

const user = `CREATE TABLE IF NOT EXISTS ${userSchema}`;
const parcel = `CREATE TABLE IF NOT EXISTS ${parcelSchema}`;

const getTableName = table => {
  const schema = table.split('(');
  const tableName = schema[0];
  console.log('======', tableName);
  const tableNameFirstLetter = tableName.charAt(0).toUpperCase();
  const tableNameSubLetters = tableName.slice(1);
  const tableFullName = `${tableNameFirstLetter}${tableNameSubLetters}`;
  console.log(`${tableFullName} table successfully created in the database!`);
};

const createTables = async () => {
  try {
    const userTable = await db.query(user);
    const parcelTable = await db.query(parcel);
    if (userTable && parcelTable) {
      getTableName(userSchema);
      getTableName(parcelSchema);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    db.end();
  }
};

createTables();
