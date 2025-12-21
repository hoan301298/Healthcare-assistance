import { Router } from "express";
import { loginController, logoutController, registerController } from "./controller/auth.controller.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
import checkAuthController from "./controller/checkAuth.controller.js";

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/logout', AuthMiddleware, logoutController);
authRouter.get('/check', AuthMiddleware, checkAuthController);

export default authRouter;