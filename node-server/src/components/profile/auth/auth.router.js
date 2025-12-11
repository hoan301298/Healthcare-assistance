import { Router } from "express";
import { loginController, logoutController, registerController } from "./controller/auth.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import checkAuthController from "./controller/checkAuth.controller.js";

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/logout', authMiddleware, logoutController);
authRouter.get('/check', authMiddleware, checkAuthController);

export default authRouter;