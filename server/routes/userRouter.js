import { Router } from "express";
import UserController from "../controllers/userController";
import { validRole } from "../middleware/validateuser";
import auth from "../middleware/auth";

const { verifyToken, verifyUserRole, verifyUser, verifyUserStatus } = auth;

const userRouter = Router();

userRouter.get("/", verifyToken, verifyUserRole, UserController.getAllUsers);

userRouter.get("/:id", verifyToken, verifyUser, UserController.getUserById);

userRouter.put(
  "/:id/role",
  validRole,
  verifyToken,
  verifyUserRole,
  verifyUserStatus,
  UserController.assignUserRole
);

export default userRouter;
