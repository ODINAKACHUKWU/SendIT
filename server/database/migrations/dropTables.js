/* eslint-disable no-console */
import db from '../../configs/db';
import getTableName from '../../helpers/migration';

const tables = ['users', 'parcels'];
const user = `DROP TABLE IF EXISTS ${tables[0]} CASCADE`;
const parcel = `DROP TABLE IF EXISTS ${tables[1]} CASCADE`;

const dropTables = async () => {
  try {
    const parcelTable = await db.query(parcel);
    if (parcelTable) {
      getTableName(tables[1]);
      const userTable = await db.query(user);
      if (userTable) {
        getTableName(tables[0]);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default dropTables;
