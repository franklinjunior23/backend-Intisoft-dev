import { CreateDisp, DeleteDisp, GetPcYLap, GetsDispositivos, UpdateDisp } from "../controller/Dispositivos.controller";
import {  Router } from "express";
const DispostivoRoutes = Router()

DispostivoRoutes.get('/',GetsDispositivos)
DispostivoRoutes.get('/PCLAP',GetPcYLap)
DispostivoRoutes.post('/:empresa/:sucursal',CreateDisp)
DispostivoRoutes.put('/:id',UpdateDisp)
DispostivoRoutes.delete('/:id',DeleteDisp)



export default DispostivoRoutes;