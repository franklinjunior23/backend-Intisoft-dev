import { ValidateUser } from "../middleware/ValidateUser";
import {
  CreateSucursal,
  DeleteBranch,
  DeleteDefineBranch,
  ExcelINventory,
  GetsBranchaDelete,
  GetSucursales,
  GetSucursalesbyEmpresa,
  RestaureBranch,
  SignDevice,
} from "../controller/Sucursales.controller";
import { Router } from "express";
import { ValidateAdminToken } from "../middleware/Admin.auth";

const Sucursales_endpoint = Router();

// get

Sucursales_endpoint.get("/delete", ValidateAdminToken, GetsBranchaDelete);
Sucursales_endpoint.get("/:nombre", ValidateUser, GetSucursalesbyEmpresa);
Sucursales_endpoint.get("/", GetSucursales);
Sucursales_endpoint.get('/:company/:branch/reporte',ExcelINventory)



// post
Sucursales_endpoint.post("/SigInDevice", SignDevice);
Sucursales_endpoint.post("/", ValidateUser, CreateSucursal);

// put
Sucursales_endpoint.put("/restaure/:id", ValidateAdminToken, RestaureBranch);

// delete
Sucursales_endpoint.delete("/:id", ValidateUser, DeleteBranch);
Sucursales_endpoint.delete(
  "/destroy/:id",
  ValidateAdminToken,
  DeleteDefineBranch
);

export default Sucursales_endpoint;
