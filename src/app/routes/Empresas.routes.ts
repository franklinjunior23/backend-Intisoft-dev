import { GetEmpresas } from "../controller/Empresa.controller";
import {  Router } from "express";

const EmpresasRoutes = Router();
EmpresasRoutes.get('/',GetEmpresas)
export default EmpresasRoutes