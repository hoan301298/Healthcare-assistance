import { Router } from "express";
import { AuthMiddleware } from '../../middleware/auth.middleware.js';
import userController from "./controller/user.controller.js";

const userRouter = Router();

userRouter.get('/', AuthMiddleware, userController.getUser);
userRouter.put('/', AuthMiddleware, userController.updateUser);
userRouter.put('/reset-password', AuthMiddleware, userController.resetPassword);

export default userRouter;