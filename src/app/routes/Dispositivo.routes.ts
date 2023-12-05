
import { ValidateUser } from "../middleware/ValidateUser";
import { CreateDisp, DeleteDisp, GetPcYLap, GetsDispUsingUser, GetsDispositivo, GetsDispositivos, UpdateDisp } from "../controller/Dispositivos.controller";
import {  Router } from "express";
const DispostivoRoutes = Router()

DispostivoRoutes.get('/',GetsDispositivos)
DispostivoRoutes.get('/Users',GetsDispUsingUser)
DispostivoRoutes.get('/:id',GetsDispositivo)
DispostivoRoutes.get('/PCLAP',GetPcYLap)
DispostivoRoutes.post('/:empresa/:sucursal',ValidateUser,CreateDisp)
DispostivoRoutes.put('/:id',ValidateUser,UpdateDisp)
DispostivoRoutes.delete('/:id',DeleteDisp)



export default DispostivoRoutes;