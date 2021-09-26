import { Router } from "express";
import { ApartmentRouter } from "./ApartmentRoutes";
import { BuildingRouter } from "./BuildingRoutes";

const router = Router();

router.use("/buildings", BuildingRouter);
router.use("/apartments", ApartmentRouter);

export { router };
