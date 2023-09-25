import { DateTime } from "luxon";

export function FechaActually(){
    const fechaHoraLima = DateTime.now().setZone("America/Lima");
    const Fecha = fechaHoraLima.toFormat("dd/MM");
    const Hora = fechaHoraLima.toFormat('HH:mm:ss');

    return {Fecha, Hora};
}
