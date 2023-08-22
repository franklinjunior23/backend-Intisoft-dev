import { CreateDisp, GetPcYLap } from "../controller/Dispositivos.controller";
import {  Router } from "express";
const DispostivoRoutes = Router()

DispostivoRoutes.get('/PCLAP',GetPcYLap)
DispostivoRoutes.post('/:empresa/:sucursal',CreateDisp)

export default DispostivoRoutes;