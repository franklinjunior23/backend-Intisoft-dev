"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualyDats = exports.FechaActually = void 0;
const luxon_1 = require("luxon");
function FechaActually() {
    const fechaHoraLima = luxon_1.DateTime.now().setZone("America/Lima");
    const Fecha = fechaHoraLima.toFormat("dd/MM");
    const Hora = fechaHoraLima.toFormat("HH:mm:ss");
    return { Fecha, Hora };
}
exports.FechaActually = FechaActually;
function ActualyDats(data) {
    try {
        const today = luxon_1.DateTime.now().setZone("America/Lima");
        const formattedToday = today.toFormat("yyyy-MM-dd");
        const documentsToday = data.filter((document) => {
            // Supongamos que document.createdAt está en un formato diferente
            const documentDate = luxon_1.DateTime.fromISO(document.createdAt); // Ajusta la zona horaria según el formato actual
            const formattedDocumentDate = documentDate
                .setZone("America/Lima")
                .toFormat("yyyy-MM-dd"); //
            // Convierte a la zona horaria de Lima y formatea
            return formattedDocumentDate === formattedToday;
        });
        return documentsToday.length;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error al contar documentos creados hoy");
    }
}
exports.ActualyDats = ActualyDats;
