import { Users, Sucursales, Empresa, Ticket } from "../models";
import { Request, Response } from "express";

//empresasss
export const GetEmpresas = async (req: Request, res: Response) => {
  try {
    const search = await Empresa.findAll({
      include: [{ model: Sucursales }],
    });
    const { count: CountEmpresas } = await Empresa.findAndCountAll();
    const { count: CountSucursales } = await Sucursales.findAndCountAll();
    const { count: CountUsers } = await Users.findAndCountAll();
    const { count: Countickets } = await Ticket.findAndCountAll();

    const details = {
      Empresas: CountEmpresas,
      Sucursales: CountSucursales,
      Usuarios:CountUsers,
      Tickets:Countickets
    };
    res.json({ data: search, details });
  } catch (error) {
    console.log(error);
    res.json({
      empresas: false,
      msg: "error en el servidor comunique con el soporte",
    });
  }
};

export const CreateEmpresa = async (req: Request, res: Response) => {
  try {
    const { nombre, lugar } = req.body;
    if (nombre && lugar) {
      const cret = await Empresa.create({
        nombre,
        lugar,
      });
      return res.json({ create: true, cret });
    }
    return res
      .status(201)
      .json({ create: false, msg: "Complete los parametros requeridos" });
  } catch (error) {
    res
      .status(501)
      .json({ error: true, msg: "conectese con el administrador EMPCONTROLL" });
  }
};
export const DeleteEmpresa = async (req: Request, res: Response) => {
  try {
    const idEmpresa = req.params.id;
    const resp = await Empresa.destroy({
      where: {
        id: idEmpresa,
      },
    });
    if (!resp) {
      return res.json({ delete: false });
    }
    res.json({ delete: true });
  } catch (error) {}
};

//sucursales
