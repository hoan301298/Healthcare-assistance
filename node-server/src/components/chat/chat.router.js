import { Router } from "express";
import chatController from "./chat.controller.js";

const chatRouter = Router();

chatRouter.post('', chatController);

export default chatRouter;