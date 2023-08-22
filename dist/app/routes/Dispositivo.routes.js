"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dispositivos_controller_1 = require("../controller/Dispositivos.controller");
const express_1 = require("express");
const DispostivoRoutes = (0, express_1.Router)();
DispostivoRoutes.get('/PCLAP', Dispositivos_controller_1.GetPcYLap);
exports.default = DispostivoRoutes;
