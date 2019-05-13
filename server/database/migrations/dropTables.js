import db from '../configs/db';

const tables = ['users', 'parcels'];

const dropTables = () => {
  tables.forEach((table) => {
    db.destroy(table);
  });
};

dropTables();
