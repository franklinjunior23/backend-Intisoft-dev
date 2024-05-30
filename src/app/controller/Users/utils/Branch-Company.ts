import { Op } from "sequelize";
import { Empresa, Sucursales } from "../../../models";

export function BranchWhitCompany({
  NameSucursal,
  NameEmpresa,
}: BranchWhitCompany) {
  const resSuc: any = Sucursales.findOne({
    where: {
      nombre: {
        [Op.eq]: NameSucursal,
      },
    },
    attributes:["id","nombre"],
    include: [
      {
        model: Empresa,
        where: {
          nombre: { [Op.eq]: NameEmpresa },
        },
        attributes:["id","nombre"]
      },
    ],
  });
  return resSuc;
}
interface BranchWhitCompany {
  NameSucursal: string;
  NameEmpresa: string;
}
