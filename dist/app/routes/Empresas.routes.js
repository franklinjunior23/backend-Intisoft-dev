"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empresa_controller_1 = require("../controller/Empresa.controller");
const express_1 = require("express");
const EmpresasRoutes = (0, express_1.Router)();
EmpresasRoutes.get('/', Empresa_controller_1.GetEmpresas);
EmpresasRoutes.post('/', Empresa_controller_1.CreateEmpresa);
EmpresasRoutes.delete('/:id', Empresa_controller_1.DeleteEmpresa);
exports.default = EmpresasRoutes;
