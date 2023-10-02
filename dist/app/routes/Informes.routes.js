"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Informes_1 = require("../controller/Informes");
const express_1 = require("express");
const informesRoutes = (0, express_1.Router)();
informesRoutes.get('/', Informes_1.GetInformes);
informesRoutes.post('/', Informes_1.CreateInforme);
informesRoutes.get('/Home', Informes_1.GetDetailsHome);
exports.default = informesRoutes;
