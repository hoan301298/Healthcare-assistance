import { Router } from "express";
import { authMiddleware } from '../../middleware/authMiddleware.js';
import {
    getUser,
    updateUser,
    resetPassword
} from "./controller/user.controller.js";

const userRouter = Router();

userRouter.get('/:id', authMiddleware, getUser);
userRouter.put('/', authMiddleware, updateUser);
userRouter.post('/reset-password', authMiddleware, resetPassword);

export default userRouter;