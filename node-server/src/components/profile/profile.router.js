import { Router } from "express";
import loginController from "./auth/login.controller.js";
import registerController from "./auth/register.controller.js";
import {
    getUser,
    updateUser,
    resetPassword
} from "./user/user.controller.js";

const profileRouter = Router();

profileRouter.post('login', loginController);
profileRouter.post('register', registerController);

profileRouter.get('/users/:id', getUser);
profileRouter.put('/users', updateUser);
profileRouter.post('/users/reset-password', resetPassword);

export default profileRouter;