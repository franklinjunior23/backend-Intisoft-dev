import Tikets from "../models/Ticket";
import Dispositivo, { DispositivoAttributes } from "../models/Dispositvo";
import Informes from "../models/Informes";
import { Request, Response } from "express";
import { FechaActually } from "../utils/DateFecha";

import Empresa from "../models/Empresa";

import { Sucursales } from "../models";
import { Model, Op } from "sequelize";

export const GetInformes = async (req: Request, res: Response) => {
  try {
    const data = await Informes.findAll({
      include: [{ model: Dispositivo }],
    });
    res.json(data);
  } catch (error) {}
};
export const CreateInforme = async (req: Request, res: Response) => {
  try {
    res.json({ create: true, msg: "creating" });
  } catch (error) {}
};

export const GetDetailsHome = async (req: Request, res: Response) => {
  try {
    const { Fecha } = FechaActually();
    const { count: countTikets } = await Tikets.findAndCountAll();
    const { count: countDispositivos } = await Dispositivo.findAndCountAll({
      where: {
        tipo: { [Op.eq]: "Pc" },
      },
    });
    const { count: ServidoresCount } = await Dispositivo.findAndCountAll({
      where: {
        tipo: { [Op.eq]: "Servidores" },
      },
    });
    const { count: LaptopCount } = await Dispositivo.findAndCountAll({
      where: {
        tipo: { [Op.eq]: "Laptop" },
      },
    });
    const { count: countEmpresas } = await Empresa.findAndCountAll();
    const { count: countBrands } = await Sucursales.findAndCountAll();
    const details = {
      Ticket: {
        TicketCount: countTikets,
      },
      Dispositivo: {
        PcCount: countDispositivos,
        ServidoresCount: ServidoresCount,
        LaptopCount: LaptopCount,
      },
      company: {
        count: countEmpresas,
      },
      brands: {
        count: countBrands,
      },
    };
    res.json(details);
  } catch (error: any) {
    res.json({ create: false, msg: error.message });
  }
};

export const GetEtiquetasPc = async (req: Request, res: Response) => {
  const { empresa, sucursal } = req.query;

  if (!empresa || sucursal === "Default")
    return res.json({ error: true, msg: "parametros requeridos" });
  try {
    const data: any | undefined = await Dispositivo.findAll({
      where: {
        IdSucursal: { [Op.eq]: Number(sucursal) },
      },
      include: [
        {
          model: Sucursales,
          attributes: ["nombre", "Token"],
          where: { id_empresa: { [Op.eq]: empresa } },
          include: [
            {
              model: Empresa,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    if (!data) return res.json({ msg: "No hay datos" });

    return res.json({ DataDispositivo: data });
  } catch (error: any) {
    return res.json({
      error: true,
      msg: "error en el servidor",
      message: error?.message,
    });
  }
};
