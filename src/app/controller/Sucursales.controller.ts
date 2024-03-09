import CreateNotify from "../utils/CreateNotify";
import Empresa from "../models/Empresa";
import Sucursal from "../models/Sucursales";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const GetSucursales = async (req: Request, res: Response) => {
  try {
    const busq = await Sucursal.findAll({
      include: [{ model: Empresa }],
    });
    return res.json({ exist: true, busq });
  } catch (error) {
    return res.status(500).json({ exist: false, msg: "Error en el servidor" });
  }
};
export const CreateSucursal = async (req: any, res: Response) => {
  try {
    const { nombre, empresa } = req.body;

    if (nombre && empresa) {
      const Emprsa: any =
        (await Empresa.findByPk(empresa)) ??
        (await Empresa.findOne({
          where: { nombre: { [Op.eq]: empresa } },
        }));

      const creat = await Sucursal.create({
        nombre,
        id_empresa: Emprsa?.id,
        Token: uuidv4(),
      });

      // await CreateNotify(
      //   `Se creo una nueva sucursal con el nombre "${creat.nombre}" en la empresa ${Emprsa.nombre}`,
      //   req?.User?.nombre,
      //   req?.User?.id
      // );

      return res.json({ create: true, creat });
    }

    return res.status(500).json({
      create: false,
      msg: "Tienes que completar los datos requeridos",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error?.message,
      observation: "Error Valid CreateBranc",
    });
  }
};

export const GetSucursalesbyEmpresa = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;

    const empre: any = await Empresa.findOne({
      where: { nombre: { [Op.eq]: nombre } },
    });

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

    return res.json(busqueda);
  } catch (error: any) {
    console.log(error);
    return res.json({
      message: error?.message,
    });
  }
};

export const SignDevice = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

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
