import { Router } from "express";
import chatController from "./chat.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const chatRouter = Router();

chatRouter.post('', authMiddleware, chatController);

export default chatRouter;