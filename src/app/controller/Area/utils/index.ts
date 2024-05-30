import { Op } from "sequelize";
import { Sucursales, Empresa } from "../../../models";
import { GetsSucursal } from "../dto/GetBranchId.dto";

export async function GetIdBranch({ CompanyName, BranchName }: GetsSucursal) {
  const DataSucursal: any = await Empresa.findOne({
    where: {
      nombre: {[Op.eq]:CompanyName},
    },
    include: {
      model: Sucursales,
      where: {
        nombre: {[Op.eq]:BranchName},
      },
    },
  });
  const IdSucursal = DataSucursal?.Sucursales[0]?.id;
  return IdSucursal;
}
