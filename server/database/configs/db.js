export default {

  destroy: table => {
    pool
      .query(`DROP TABLE IF EXISTS ${table} CASCADE`)
      .then(() => {
        const tableNameFirstLetter = table.charAt(0).toUpperCase();
        const tableNameSubLetters = table.slice(1);
        const tableFullName = `${tableNameFirstLetter}${tableNameSubLetters}`;
        console.log(`${tableFullName} table successfully deleted from the database!`);
      })
      .catch(err => {
        console.log(err);
      });
  },

  insertParcel: data => {
    const { userId, sender, receiver, item, pickupLocation, destination, schedule, presentLocation, price, status } = data;
    pool
      .query(
        `INSERT INTO parcels (userid, sender, receiver, item, pickup_location, destination, schedule, present_location, price, order_status) VALUES (
          '${userId}',
          '${sender}',
          '${receiver}',
          '${item}',
          '${pickupLocation}',
          '${destination}',
          '${schedule}',
          '${presentLocation}',
          '${price}',
          '${status}')`,
      )
      .then(() => {
        console.log('Parcel has been added to the database!');
      })
      .catch(err => {
        console.log(err);
      });
  },

  insertUser: data => {
    const { firstName, lastName, phoneNumber, email, password, category } = data;
    pool
      .query(
        `INSERT INTO users (first_name, last_name, phone_number, email, pass_word, category) VALUES ('${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${password}', '${category}')`,
      )
      .then(() => {
        console.log('User has been added to the database!');
      })
      .catch(err => {
        console.log(err);
      });
  },
};
