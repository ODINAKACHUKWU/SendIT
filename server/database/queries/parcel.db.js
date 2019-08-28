import db from '../../configs/dbConfig';

class Parcel {
  static async findById() {
    try {
      await db.connection();
      //   const text = 'SELECT * FROM users WHERE email = $1';
      //   const res = await db.query(text, [email]);
      //   if (res.rowCount === 1) {
      //     return res.rows[0];
      //   }
      //   return false;
    } catch (error) {
      return error;
    }
  }

  static async create(data) {
    const { userId, sender, receiver, item, pickupLocation, destination, schedule, presentLocation, price, status } = data;
    try {
      await db.connection();
      // eslint-disable-next-line max-len
      const text = 'INSERT INTO parcels (userid, sender, receiver, item, pickup_location, destination, schedule, present_location, price, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const values = [userId, sender, receiver, item, pickupLocation, destination, schedule, presentLocation, price, status];
      const res = await db.query(text, values);
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}

export default Parcel;
