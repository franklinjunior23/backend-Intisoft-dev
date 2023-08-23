import { CreateInforme, GetInformes } from "../controller/Informes";
import { Router } from "express";

const informesRoutes = Router();

informesRoutes.get('/',GetInformes)
informesRoutes.post('/',CreateInforme)

export default informesRoutes