"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FechaActually = void 0;
const luxon_1 = require("luxon");
function FechaActually() {
    const fechaHoraLima = luxon_1.DateTime.now().setZone("America/Lima");
    const Fecha = fechaHoraLima.toFormat("dd/MM");
    const Hora = fechaHoraLima.toFormat('HH:mm:ss');
    return { Fecha, Hora };
}
exports.FechaActually = FechaActually;
