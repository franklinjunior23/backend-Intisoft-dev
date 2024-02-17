import { ValidateUser } from "../middleware/ValidateUser";
import {
  CreateSucursal,
  GetSucursales,
  GetSucursalesbyEmpresa,
  ReadCockie,
  SignDevice,
} from "../controller/Sucursales.controller";
import { Router } from "express";

const Sucursales_endpoint = Router();

Sucursales_endpoint.get("/", GetSucursales);
Sucursales_endpoint.post("/", ValidateUser, CreateSucursal);
Sucursales_endpoint.get("/:nombre", GetSucursalesbyEmpresa);
Sucursales_endpoint.post("/SigInDevice", SignDevice);

Sucursales_endpoint.get("/LeerCoockie", ReadCockie);

export default Sucursales_endpoint;
