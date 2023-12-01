import CreateNotify from "../utils/CreateNotify";
import Empresa from "../models/Empresa";
import Sucursal from "../models/Sucursales";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const GetSucursales = async (req: Request, res: Response) => {
  try {
    const busq = await Sucursal.findAll({
      include: [{ model: Empresa }],
    });
    res.json({ exist: true, busq });
  } catch (error) {
    res.json({ exist: error, msg: "Error en el servidor" });
  }
};
export const CreateSucursal = async (req: any, res: Response) => {
  try {
    const { nombre, empresa } = req.body;
    if (nombre && empresa) {
      const creat = await Sucursal.create({
        nombre,
        id_empresa: empresa,
        Token: uuidv4(),
      });
      await CreateNotify(
        `Se creo una nueva sucursal con el nombre "${creat.nombre}" en la empresa ${empresa}`,
        req.User?.nombre
      );
      res.json({ create: true, creat });
    }
    return res.status(500).json({
      create: false,
      msg: "Tienes que completar los datos requeridos",
    });
  } catch (error) {}
};
export const GetSucursalesbyEmpresa = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const empre: any = await Empresa.findOne({ where: { nombre } });
    console.log(empre);

    if (!empre) {
      const details = {
        msg: "No se encontro la empresa",
        error: true,
      };
      return res.json({ details });
    }

    const busqueda = await Sucursal.findAll({
      where: {
        id_empresa: empre?.id,
      },
    });

    res.json(busqueda);
  } catch (error) {}
};

export const SignDevice = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log(token);

    if (!token) {
      return res.json({ error: true, msg: "Token Invalido" });
    }

    const sucursal = await Sucursal.findOne({ where: { Token: token } });

    if (!sucursal) {
      const details = {
        message: "Token Invalido , intente nuevamente",
        estatus: "error",
      };
      return res.json({ ...details });
    }

    res.json(sucursal);
  } catch (error) {
    console.log({ error: true, message: error });
    res.json({ error: true, message: error });
  }
};

export const ReadCockie = async (req: Request, res: Response) => {
  console.log(req.cookies.miCookie);
  res.json({ cookie: req.cookies });
  // no me recepciona la coockie
};
