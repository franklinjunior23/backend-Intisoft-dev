import Administradores from "../models/Administradores";
import Tikets from "../models/Ticket";
import { Request, Response } from "express";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import { FechaActually } from "../utils/DateFecha";
import { Dispositvo, Users } from "../models";
import CreateNotify from "../utils/CreateNotify";

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
          include: [
            { model: Users, attributes: ["nombre", "apellido", "id"] },
            { model: Dispositvo, attributes: ["nombre", "id"] },
          ],
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
          attributes: ["usuario"],
        },
        {
          model: Sucursal,
          attributes: ["nombre"],
          include: [{ model: Empresa, attributes: ["nombre"] }],
        },
        {
          model: Administradores,
          attributes: ["usuario"],
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
    // para traer la fecha y la hora actual
    const { Fecha, Hora } = FechaActually();

    // recojer los datos que manda el frontend

    const Dats: DataBodyTickets = req.body;

    // buscar el id de la empresa y la sucursal , con lo que manda el frontend
    const idEmpresaSucursal: any = await Empresa.findOne({
      where: { nombre: Dats.Empresa },
      attributes: ["id", "nombre"], // Corregir aquí
      include: [
        {
          model: Sucursal,
          where: { nombre: Dats.Sucursal },
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!idEmpresaSucursal) {
      return res.json({
        create: false,
        message: "No se encontro la empresa o la sucursal",
      });
    }

    const UserId = req.User.id;

    const TicketCreate: any = await Tikets.create({
      ...Dats,
      UsuarioId: UserId,
      Estado: "Abierto",
      EmpresaId: idEmpresaSucursal.id,
      SucursalId: idEmpresaSucursal.Sucursales[0].id,
      Fecha,
      Hora,
      TypeItem: Dats.TipoD ?? null,
      ItemId: Dats.IdItemTick ?? null,
    });
    await CreateNotify(
      `Se ha creado un nuevo Ticket con el id "${TicketCreate.id}" en la empresa "${idEmpresaSucursal.nombre}" de la sucursal "${idEmpresaSucursal.Sucursales[0].nombre}" tipo de item ${Dats.TipoD}.`,
      req.User.nombre,
      req.User.id
    );
    res.json({
      create: true,
      message: `Ticket creado con exito COD: ${TicketCreate.id}`,
    });
  } catch (error) {
    res.json({ create: error });
  }
}

export async function UpdateTickets(req: any, res: Response) {
  try {
    const { id } = req.params;

    const { Estado } = req.body;

    const UserId = req.User.nombre;

    const TicketOld: any = await Tikets.findByPk(id);

    if (!TicketOld) {
      return res.status(404).json({
        update: false,
        message: "Ticket no encontrado",
      });
    }

    if (TicketOld.Estado === "Cerrado" || TicketOld.Estado === "Cancelado") {
      return res.json({
        update: false,
        message: "No se puede actualizar un ticket cerrado o cancelado",
      });
    }

    const updatedTicket = await Tikets.update(
      { Estado, UserUpdateId: UserId },
      { where: { id } }
    );

    if (updatedTicket[0] === 0) {
      return res.status(500).json({
        update: false,
        message: "Error al actualizar el ticket",
      });
    }

    await CreateNotify(
      `Se ha actualizado el ticket con el id "${TicketOld.id}" a "${Estado}"`,
      req.User.nombre,
      req.User.id
    );
    res.json({
      update: true,
      message: `Ticket actualizado a ${Estado} con éxito`,
    });
  } catch (error) {
    console.error("Error al actualizar el ticket:", error);
    res.status(500).json({
      update: false,
      message: "Error interno del servidor al actualizar el ticket",
    });
  }
}

interface DataBodyTickets {
  Estado: string;
  Titulo: string;
  Descripcion: string;
  TipoD: string;
  ItemId: string;
  Nivel: string;
  Prioridad: string;
  Fecha: string;
  Hora: string;
  Sucursal: string;
  Empresa: string;
  UsuarioId: string;
  AdministradorId: string;
  IdItemTick: string;
}

interface DataEmpresaSucursal {
  id: number;
  nombre: string;
  Sucursales: {
    id: number;
    nombre: string;
  };
}
