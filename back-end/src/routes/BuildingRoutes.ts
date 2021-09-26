import { Router } from "express";
import BuildingController from "../controllers/BuildingController";

const BuildingRouter = Router();

BuildingRouter.put("/", BuildingController.create);
BuildingRouter.get("/", BuildingController.show);
BuildingRouter.get("/:id", BuildingController.showById);
BuildingRouter.delete("/:id", BuildingController.delete);

export { BuildingRouter };
