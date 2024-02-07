import { CreateEmpresa, GetEmpresas,DeleteEmpresa } from "../controller/Empresa.controller";
import {  Router } from "express";
import { ValidateSoporteToken, } from "../middleware/Soporte.auth";
import { ValidateUser } from "../middleware/ValidateUser";
import { ValidateAdminToken } from "../middleware/Admin.auth";
import { AuthTokenCoockie } from "../middleware/AuthAdmin";

const EmpresasRoutes = Router();
EmpresasRoutes.get('/', GetEmpresas)
EmpresasRoutes.post('/',ValidateUser,CreateEmpresa)
EmpresasRoutes.delete('/:id',ValidateAdminToken,DeleteEmpresa)



export default EmpresasRoutes