import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { AppointmentController } from "./appointment.controller.js";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.get('', AuthMiddleware, appointmentController.getAppointmentsByAuth);

export default appointmentRouter;