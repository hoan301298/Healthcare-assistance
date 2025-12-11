import { Router } from "express";
import placesController from "./controller/places.controller.js";

const placesRouter = Router();

placesRouter.post('', placesController);

export default placesRouter;