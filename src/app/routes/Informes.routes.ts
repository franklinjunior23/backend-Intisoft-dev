import { CreateInforme, GetDetailsHome, GetInformes } from "../controller/Informes";
import { Router } from "express";

const informesRoutes = Router();

informesRoutes.get('/',GetInformes)
informesRoutes.post('/',CreateInforme)
informesRoutes.get('/Home',GetDetailsHome)

export default informesRoutes