import Administradores from "../models/Administradores";
import Tikets from "../models/Ticket";
import { Request, Response } from "express";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import { FechaActually } from "../utils/DateFecha";
import { Dispositvo, Users } from "../models";

export async function GetAllTickets(req: Request, res: Response) {
  try {
    function contarTicketsCerrados(tickets: any, estado: string): Number {
      const ticketsCerrados = tickets.filter(
        (ticket: any) => ticket.Estado === estado
      );
      return ticketsCerrados.length;
    }
    const { Fecha } = FechaActually();

    const Empresas = await Empresa.findAll({
      attributes: ["nombre"],
      include: [
        {
          model: Sucursal,
          attributes: ["nombre", "id"],
          include: [{ model: Users, attributes: ["nombre", "apellido"] },{model:Dispositvo,attributes:["nombre","id"]}],
        },
      ],
    });
    const TicketAbiertos = await Tikets.findAll({
      where: { Estado: "Abierto" },
      order: [["createdAt", "DESC"]],
    });

    const Ticke = await Tikets.findAll({
      where: {
        Fecha: Fecha,
      },
      include: [
        {
          model: Administradores,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Sucursal,
          attributes: ["nombre"],
          include: [{ model: Empresa, attributes: ["nombre"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const TicketsAll = await Tikets.findAll({
      include: [
        {
          model: Administradores,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Sucursal,
          attributes: ["nombre"],
          include: [{ model: Empresa, attributes: ["nombre"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({
      Details: {
        cantidad: Ticke.length,
        fecha: Fecha,
        cerrado: contarTicketsCerrados(Ticke, "Cerrado"),
        abierto: contarTicketsCerrados(Ticke, "Abierto"),
      },
      tickets: Ticke,
      TicketsOpen: TicketAbiertos,
      Empresas,
      TicketsAll,
    });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

export async function CreateTickets(req: any, res: Response) {
  try {
    const { Fecha, Hora } = FechaActually();
    const Dats = req.body;
    const UserId = req.User.id;
    const TicketCreate = await Tikets.create({
      ...Dats,
      UsuarioId: UserId,
      Estado: "Abierto",
      Fecha,
      Hora,
    });
    res.json({ create: true });
  } catch (error) {
    res.json({ create: error });
  }
}
