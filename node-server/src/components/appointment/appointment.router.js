import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { AppointmentController } from "./appointment.controller.js";

const appointmentRouter = Router();

appointmentRouter.get('', AuthMiddleware, AppointmentController);

export default appointmentRouter;