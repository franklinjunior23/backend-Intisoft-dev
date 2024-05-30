import {
  CreateInforme,
  GetDetailsHome,
  GetEtiquetasPc,
  GetInformes,
} from "../controller/Informes";
import { Router } from "express";

const informesRoutes = Router();

informesRoutes.get("/", GetInformes);
informesRoutes.get("/:tipo/Etiquetas", GetEtiquetasPc);
informesRoutes.get("/Home", GetDetailsHome);

export default informesRoutes;
