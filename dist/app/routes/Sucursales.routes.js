"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sucursales_controller_1 = require("../controller/Sucursales.controller");
const express_1 = require("express");
const Sucursales_endpoint = (0, express_1.Router)();
Sucursales_endpoint.get('/', Sucursales_controller_1.GetSucursales);
Sucursales_endpoint.get('/:nombre', Sucursales_controller_1.GetSucursalesbyEmpresa);
Sucursales_endpoint.post('/', Sucursales_controller_1.CreateSucursal);
exports.default = Sucursales_endpoint;
