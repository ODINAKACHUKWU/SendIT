import db from "../../configs/dbConfig";
import { hashPassword } from "../../helpers/password";

class User {
  static async findByEmail(email) {
    try {
      await db.connection();
      const text = "SELECT * FROM users WHERE email = $1";
      const res = await db.query(text, [email]);
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async create(data) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      category
    } = data;
    const hashedPassword = await hashPassword(password);
    try {
      await db.connection();
      const text =
        "INSERT INTO users (first_name, last_name, phone_number, email, pass_word, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [
        firstName,
        lastName,
        phoneNumber,
        email,
        hashedPassword,
        category
      ];
      const res = await db.query(text, values);
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async findAll() {
    try {
      await db.connection();
      const text =
        "SELECT UserID, first_name, last_name, phone_number, email, category FROM users ORDER BY userId ASC";
      const res = await db.query(text);
      if (res.rowCount > 0) {
        return [res.rows, res.rowCount];
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async findById(id) {
    try {
      await db.connection();
      const text =
        "SELECT UserID, first_name, last_name, phone_number, email, category FROM users WHERE userId = $1";
      const res = await db.query(text, [id]);
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async updateOne(values) {
    const columns = Object.keys(values);
    const columnValues = Object.values(values);
    try {
      await db.connection();
      const text = `UPDATE users SET ${columns[0]} = $1 WHERE ${columns[1]} = $2 RETURNING UserID, first_name, last_name, phone_number, email, category`;
      const res = await db.query(text, columnValues);
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}

export default User;
