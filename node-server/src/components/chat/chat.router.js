import { Router } from "express";
import chatController from "./chat.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.get('', AuthMiddleware, chatController);

export default chatRouter;