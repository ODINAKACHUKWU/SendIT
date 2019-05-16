import db from '../configs/db';

const tables = ['users', 'parcels'];

const dropTables = () => {
  tables.map(table => db.destroy(table));
};

dropTables();
