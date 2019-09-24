import pool from "../configs/dbConfig";
import http from "../helpers/http";
import User from "../database/queries/user.db";

const { httpResponse, serverError } = http;

class UserController {
  /**
   * @method getAllUsers
   * @memberof UserController
   * @description Fetches all the users
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} API response object
   */
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users) {
        return httpResponse(res, {
          statusCode: 200,
          status: "success",
          message: "Users retrieved",
          data: users[0]
        });
      }
      return httpResponse(res, {
        statusCode: 200,
        status: "success",
        message: "There are no users"
      });
    } catch (error) {
      return serverError(res, error);
    }
  }

  /**
   * @method getUserById
   * @memberof UserController
   * @description Fetches a user by id
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} API response object
   */
  static async getUserById(req, res) {
    const {
      user: { id }
    } = req;
    try {
      const user = await User.findById(id);
      if (user) {
        return httpResponse(res, {
          statusCode: 200,
          status: "success",
          message: "User retrieved",
          data: user
        });
      }
      return httpResponse(res, {
        statusCode: 404,
        status: "failure",
        message: "User not found"
      });
    } catch (error) {
      return serverError(res, error);
    }
  }

  /**
   * @method assignUserRole
   * @memberof UserController
   * @description Assigns regular or admin role to a user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} API response object
   */
  static async assignUserRole(req, res) {
    const { category } = req.body;
    const userid = req.user.id;
    try {
      const user = await User.updateOne({ category, userid });
      if (user) {
        return httpResponse(res, {
          statusCode: 200,
          status: "success",
          message: "Role successfully updated",
          data: user
        });
      }
      return httpResponse(res, {
        statusCode: 404,
        status: "failure",
        message: "User not found"
      });
    } catch (error) {
      return serverError(res, error);
    }
  }
}

export default UserController;
