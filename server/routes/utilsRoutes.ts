import * as utilsController from "../controllers/utilsController";
import express from "express";
const utilsRouter = express.Router();

utilsRouter.post("/newsletter", utilsController.newsletter);

export default utilsRouter;
