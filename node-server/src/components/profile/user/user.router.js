import { Router } from "express";
import { AuthMiddleware } from '../../middleware/auth.middleware.js';
import {
    getUser,
    updateUser,
    resetPassword
} from "./controller/user.controller.js";

const userRouter = Router();

userRouter.get('/:id', AuthMiddleware, getUser);
userRouter.put('/', AuthMiddleware, updateUser);
userRouter.post('/reset-password', AuthMiddleware, resetPassword);

export default userRouter;