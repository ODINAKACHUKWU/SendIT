import { Router } from 'express';
import { validSignup, validLogin } from '../middleware/validateuser';
import AuthenticationController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validSignup, AuthenticationController.signupUser);
authRouter.post('/login', validLogin, AuthenticationController.loginUser);

export default authRouter;
