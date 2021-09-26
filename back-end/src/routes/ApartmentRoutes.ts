import { Router } from "express";
import ApartmentController from "../controllers/ApartmentController";

const ApartmentRouter = Router();

ApartmentRouter.put("/", ApartmentController.create);
ApartmentRouter.get("/", ApartmentController.show);
ApartmentRouter.get("/:id", ApartmentController.showByBuildingId);
ApartmentRouter.delete("/:id", ApartmentController.delete);

export { ApartmentRouter };
