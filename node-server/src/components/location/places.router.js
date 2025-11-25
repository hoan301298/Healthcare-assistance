import { Router } from "express";
import placesController from "./places.controller.js";

const placesRouter = Router();

placesRouter.post('', placesController);

export default placesRouter;