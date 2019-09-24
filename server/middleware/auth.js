import configs from "../configs/jwtConfig";
import jwt from "../helpers/jwt";
import http from "../helpers/http";

const { httpResponse, serverError } = http;
const { decodeToken } = jwt;

export default {
  verifyToken: async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return httpResponse(res, {
        statusCode: 401,
        status: "failure",
        message: "Token is not provided"
      });
    }
    try {
      const decoded = await decodeToken(token, configs);
      req.user = decoded;
      next();
    } catch (error) {
      return serverError(res, error);
    }
  },

  verifyUserRole: (req, res, next) => {
    const {
      user: { category }
    } = req;
    if (category !== "Admin") {
      return httpResponse(res, {
        statusCode: 403,
        status: "failure",
        message: "User is not an admin"
      });
    }
    next();
  },

  verifyUser: (req, res, next) => {
    const {
      user: { userId, category }
    } = req;
    const id = parseInt(req.params.id, 10);
    if (userId !== id && category !== "Admin") {
      return httpResponse(res, {
        statusCode: 403,
        status: "failure",
        message: "User is not authorized to access this resource"
      });
    }
    req.user.id = id;
    next();
  },

  verifyUserStatus: (req, res, next) => {
    const {
      user: { userId }
    } = req;
    const id = parseInt(req.params.id, 10);
    if (userId === id) {
      return httpResponse(res, {
        statusCode: 403,
        status: "failure",
        message: "User is not authorized to complete this request"
      });
    }
    req.user.id = id;
    next();
  }
};
