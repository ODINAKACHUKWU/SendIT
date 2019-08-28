import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthenticateUser from '../middleware/auth';

const userRouter = Router();

userRouter.get('/', AuthenticateUser.verifyToken, UserController.getAllUsers);

userRouter.get('/:id', AuthenticateUser.verifyToken, UserController.getUserById);

userRouter.put('/:id/role', AuthenticateUser.verifyToken, UserController.assignAdmin);

userRouter.put('/:id/regular', AuthenticateUser.verifyToken, UserController.assignRegular);

export default userRouter;
