import { CreateEmpresa, GetEmpresas,DeleteEmpresa, UpdateCompany, GetByCompany } from "../controller/Empresa.controller";
import {  Router } from "express";
import { ValidateSoporteToken, } from "../middleware/Soporte.auth";
import { ValidateUser } from "../middleware/ValidateUser";
import { ValidateAdminToken } from "../middleware/Admin.auth";
import { AuthTokenCoockie } from "../middleware/AuthAdmin";

const EmpresasRoutes = Router();

// Get
EmpresasRoutes.get('/', GetEmpresas)
EmpresasRoutes.get('/:name',GetByCompany)

// POST
EmpresasRoutes.post('/',ValidateUser,CreateEmpresa)

// PUT
EmpresasRoutes.put('/:name',ValidateUser,UpdateCompany)


// DELETE
EmpresasRoutes.delete('/:id',ValidateAdminToken,DeleteEmpresa)



export default EmpresasRoutes