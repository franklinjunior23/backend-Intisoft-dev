import {
  GetAreas,
  PostAreas,
  GetsAreas,
} from "../../controller/Area/AreaController";
import { Router } from "express";
const AreaRoutes: Router = Router();
AreaRoutes.get("/", GetsAreas);
AreaRoutes.get("/:IdSucursal", GetAreas);
AreaRoutes.post("/", PostAreas);
export default AreaRoutes;
