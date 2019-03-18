import pool from '../configs/db';

pool.on('connect', () => {
  console.log('connected to the database');
});

/**
 * Create Parcel Table
 */
const createParcelTable = () => {
  const queryText = `
    DROP TABLE IF EXISTS parcels;
    CREATE TABLE
      parcels(
        id SERIAL PRIMARY KEY,
        UserID INT NOT NULL,
        sender TEXT NOT NULL,
        receiver TEXT NOT NULL,
        item TEXT NOT NULL,
        pickup_location TEXT NOT NULL,
        destination TEXT NOT NULL,
        schedule TEXT NOT NULL,
        present_location TEXT NOT NULL,
        price INT NOT NULL,
        order_status TEXT NOT NULL,
        date_created TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (UserID) REFERENCES users(UserID)
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

createParcelTable();

// /**
//  * Create User Table
//  */
// const createUserTable = () => {
//   const queryText = `
//       DROP TABLE IF EXISTS users;
//       CREATE TABLE IF NOT EXISTS
//         users(
//           UserID SERIAL PRIMARY KEY,
//           first_name TEXT NOT NULL,
//           last_name TEXT NOT NULL,
//           phone_number TEXT NOT NULL,
//           email TEXT UNIQUE NOT NULL,
//           pass_word TEXT NOT NULL,
//           category TEXT NOT NULL,
//           date_created TIMESTAMP DEFAULT NOW()
//         )`;

//   pool
//     .query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };


// /**
//  * Drop Parcel Table
//  */
// const dropParcelTable = () => {
//   const queryText = 'DROP TABLE IF EXISTS parcels';
//   pool
//     .query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// /**
//  * Drop User Table
//  */
// const dropUserTable = () => {
//   const queryText = 'DROP TABLE IF EXISTS users';
//   pool
//     .query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

// export {
//   createParcelTable,
//   dropParcelTable,
//   createUserTable,
//   dropUserTable
// };
