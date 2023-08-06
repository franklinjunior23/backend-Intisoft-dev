import { CreateSucursal, GetSucursales } from "../controller/Sucursales.controller";
import {  Router } from "express";



const Sucursales_endpoint = Router();


Sucursales_endpoint.get('/',GetSucursales)
Sucursales_endpoint.post('/',CreateSucursal)

export default Sucursales_endpoint