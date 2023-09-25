import { CreateEmpresa, GetEmpresas,DeleteEmpresa } from "../controller/Empresa.controller";
import {  Router } from "express";
import { ValidateSoporteToken } from "../middleware/Soporte.auth";

const EmpresasRoutes = Router();
EmpresasRoutes.get('/', GetEmpresas)
EmpresasRoutes.post('/',CreateEmpresa)
EmpresasRoutes.delete('/:id',DeleteEmpresa)



export default EmpresasRoutes