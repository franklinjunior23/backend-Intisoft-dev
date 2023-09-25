import Administradores from "../models/Administradores";
import Tikets from "../models/Ticket";
import { Request, Response } from "express";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";

export async function GetAllTickets(req: Request, res: Response) {
  try {
    const Ticke = await Tikets.findAll({
      include: [
        {
          model: Administradores,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Sucursal,
          attributes: ["nombre"],
          include: [
            {   model: Empresa, 
                attributes: ["nombre"] 
            }
            ],
        },
      ],
    });
    return res.json({ tickets: Ticke });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
export async function CreateTickets(req: Request, res: Response) {
  const {observacion} = req.body;
}
