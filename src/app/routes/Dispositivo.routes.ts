import { GetPcYLap } from "../controller/Dispositivos.controller";
import {  Router } from "express";
const DispostivoRoutes = Router()

DispostivoRoutes.get('/PCLAP',GetPcYLap)

export default DispostivoRoutes;