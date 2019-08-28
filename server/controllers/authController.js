import User from '../database/queries/user.db';
import { httpResponse, serverError } from '../helpers/http';
import jwt from '../helpers/jwt';
import { comparePassword } from '../helpers/password';
import configs from '../configs/jwtConfig';

const { generateToken } = jwt;
const failureResponses = [
  {
    statusCode: 400,
    status: 'failure',
    message: 'Invalid login credentials',
  },
  {
    statusCode: 409,
    status: 'failure',
    message: 'Email has already been used',
  },
];

class AuthenticationController {
  /**
   * @method signupUser
   * @description Create a user account
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} API response object
   */
  static async signupUser(req, res) {
    const { firstName, lastName, phoneNumber, email, password, category } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        const newUser = await User.create({ firstName, lastName, phoneNumber, email, password, category });
        if (newUser) {
          const payload = { userId: newUser.userid, category: newUser.category };
          const token = await generateToken(payload, configs);
          return httpResponse(res, {
            statusCode: 201,
            status: 'success',
            message: `Account created for ${newUser.first_name} ${newUser.last_name}`,
            token,
          });
        }
      }
      return httpResponse(res, failureResponses[1]);
    } catch (error) {
      return serverError(res, error);
    }
  }

  /**
   * @method loginUser
   * @description Log in a user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} API response object
   */
  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (user) {
        const isUser = await comparePassword(password, user.pass_word);
        if (isUser) {
          const payload = { userId: user.userid, category: user.category };
          const token = await generateToken(payload, configs);
          return httpResponse(res, {
            statusCode: 200,
            status: 'success',
            message: `${user.first_name} ${user.last_name} is logged in`,
            token,
          });
        }
        return httpResponse(res, failureResponses[0]);
      }
      return httpResponse(res, failureResponses[0]);
    } catch (error) {
      return serverError(res, error);
    }
  }
}

export default AuthenticationController;
