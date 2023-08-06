import { CreateEmpresa, GetEmpresas } from "../controller/Empresa.controller";
import {  Router } from "express";

const EmpresasRoutes = Router();
EmpresasRoutes.get('/',GetEmpresas)
EmpresasRoutes.post('/',CreateEmpresa)


export default EmpresasRoutes