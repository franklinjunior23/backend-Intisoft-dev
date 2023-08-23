import { CreateDisp, GetPcYLap, GetsDispositivos } from "../controller/Dispositivos.controller";
import {  Router } from "express";
const DispostivoRoutes = Router()

DispostivoRoutes.get('/',GetsDispositivos)
DispostivoRoutes.get('/PCLAP',GetPcYLap)
DispostivoRoutes.post('/:empresa/:sucursal',CreateDisp)

export default DispostivoRoutes;