/* eslint-disable no-console */
const getTableName = table => {
  const schema = table.split('(');
  const tableName = schema[0];
  if (schema[1]) {
    console.log(`== Creating ${tableName} table if it does not exist in the database...`);
  } else {
    console.log(`== Deleting ${tableName} table if it exist in the database...`);
  }
};

export default getTableName;
