import { Router } from "express";
import auth from '../middleware/authMiddleware.js';
import { loginController, registerController } from "./user/controllers/user.controller.js";
import {
    getUser,
    updateUser,
    resetPassword
} from "./auth/auth.controller.js";

const profileRouter = Router();

profileRouter.post('/login', loginController);
profileRouter.post('/register', registerController);

profileRouter.get('/users/:id', auth, getUser);
profileRouter.put('/users', auth, updateUser);
profileRouter.post('/users/reset-password', auth, resetPassword);

export default profileRouter;