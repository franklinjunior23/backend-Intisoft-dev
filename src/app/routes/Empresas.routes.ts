import { CreateEmpresa, GetEmpresas,DeleteEmpresa } from "../controller/Empresa.controller";
import {  Router } from "express";
import { ValidateSoporteToken } from "../middleware/Soporte.auth";
import { ValidateUser } from "../middleware/ValidateUser";

const EmpresasRoutes = Router();
EmpresasRoutes.get('/', GetEmpresas)
EmpresasRoutes.post('/',ValidateUser,CreateEmpresa)
EmpresasRoutes.delete('/:id',DeleteEmpresa)



export default EmpresasRoutes