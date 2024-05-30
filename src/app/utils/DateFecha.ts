import { DateTime } from "luxon";

export function FechaActually() {
  const fechaHoraLima = DateTime.now().setZone("America/Lima");
  const Fecha = fechaHoraLima.toFormat("dd/MM");
  const Hora = fechaHoraLima.toFormat("HH:mm:ss");

  return { Fecha, Hora };
}
export function ActualyDats(data: []) {
  try {
    const today = DateTime.now().setZone("America/Lima");
    const formattedToday = today.toFormat("yyyy-MM-dd");

    const documentsToday = data.filter((document: any) => {
      // Supongamos que document.createdAt está en un formato diferente
      const documentDate = DateTime.fromISO(document.createdAt); // Ajusta la zona horaria según el formato actual
      const formattedDocumentDate = documentDate
        .setZone("America/Lima")
        .toFormat("yyyy-MM-dd"); //
      // Convierte a la zona horaria de Lima y formatea
      return formattedDocumentDate === formattedToday;
    });

    return documentsToday.length;
  } catch (error) {
    console.error(error);
    throw new Error("Error al contar documentos creados hoy");
  }
}
