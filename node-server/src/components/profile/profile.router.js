import { Router } from "express";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { loginController, registerController } from "./user/controllers/user.controller.js";
import {
    getUser,
    updateUser,
    resetPassword
} from "./auth/auth.controller.js";
import checkAuthController from "./auth/controller/checkAuth.controller.js";

const profileRouter = Router();

profileRouter.post('/login', loginController);
profileRouter.post('/register', registerController);

profileRouter.get('/check', authMiddleware, checkAuthController);

profileRouter.get('/users/:id', authMiddleware, getUser);
profileRouter.put('/users', authMiddleware, updateUser);
profileRouter.post('/users/reset-password', authMiddleware, resetPassword);

export default profileRouter;