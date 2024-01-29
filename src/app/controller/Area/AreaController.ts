import { Area, Dispositvo, Empresa, Sucursales, Users } from "../../models";
import { Request, Response } from "express";
import { CreateArea } from "./dto/CreateArea.dto";
import { GetIdBranch } from "./utils";
import { Op } from "sequelize";

export async function GetAreas(Req: Request, Res: Response) {
  const { IdSucursal } = Req.params;
  try {
    const DataSucursal = await Sucursales.findByPk(IdSucursal);
    if (!DataSucursal)
      return Res.status(404).json({
        status: 404,
        error: "Not Found",
      });

    const data = await Area.findAll({
      where: {
        SucursaleId: IdSucursal, // Reemplaza "sucursalId" con el valor deseado
      },
      include: { model: Users },
    });

    Res.json(data);
  } catch (error: any) {
    return Res.status(404).json({
      status: 404,
      error: "Not Found",
      message: error?.message,
    });
  }
}

export async function PostAreas(Req: Request, Res: Response) {
  const { CompanyName, BranchName, name }: CreateArea = Req.body;
  try {
    if (!CompanyName || !BranchName)
      return Res.status(404).json({
        status: 404,
        error: "Not Found",
      });
    const DataSucursal: any = await Empresa.findOne({
      where: {
        nombre: CompanyName,
      },
      include: {
        model: Sucursales,
        where: {
          nombre: BranchName,
        },
      },
    });
    const IdSucursal = DataSucursal?.Sucursales[0]?.id;

    const Created = await Area.create({ name, SucursaleId: IdSucursal });
    if (Created)
      return Res.json({
        create: true,
        message: "Se creo correctamente",
        body: Created,
      });
  } catch (error: any) {
    return Res.status(404).json({
      status: 404,
      error: "Not Found",
      message: error?.message,
    });
  }
}
interface QueryGets {
  Company: string;
  Branch: string;
}

export async function GetsAreas(Req: Request, Res: Response) {
  const { Company, Branch } = Req.query as unknown as QueryGets;

  const SucursaleId = await GetIdBranch({
    CompanyName: Company,
    BranchName: Branch,
  });

  const AreasData = await Area.findAll({
    where: {SucursaleId:{[Op.eq]:SucursaleId}},
    attributes: ["name", "id", "createdAt"],
    order:[['createdAt','DESC']]
  });
  return Res.json({
    body:AreasData,
  });
  // Resto del código...
}
