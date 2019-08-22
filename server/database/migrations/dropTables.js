/* eslint-disable no-console */
import db from '../../configs/db';

const tables = ['users', 'parcels'];

const dropTables = () => {
  try {
    tables.forEach(async table => {
      const res = await db.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
      if (res) {
        const schema = table.split('(');
        console.log(schema);
        const tableName = schema[0];
        const tableNameFirstLetter = tableName.charAt(0).toUpperCase();
        const tableNameSubLetters = tableName.slice(1);
        const tableFullName = `${tableNameFirstLetter}${tableNameSubLetters}`;
        console.log(`${tableFullName} table successfully deleted from the database!`);
      } else {
        console.log('>>>', res);
      }
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    db.end();
  }
};

dropTables();
