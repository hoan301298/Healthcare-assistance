import { Router } from "express";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";

const profileRouter = Router();

profileRouter.use('/auth', authRouter);
profileRouter.use('/user', userRouter);

export default profileRouter;