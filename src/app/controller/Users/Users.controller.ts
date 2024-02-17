import { Request, Response } from "express";
import { BranchWhitCompany } from "./utils/Branch-Company";
import { Area, Users } from "../../models";

export async function CreateUser(Req: Request, Res: Response) {
 try {
  const Data = Req.body;
  const { Sucursal, Empresa } = Req.query;
  const Exist = await BranchWhitCompany({
    NameEmpresa: String(Empresa),
    NameSucursal: String(Sucursal),
  });

  if (!Exist) return Res.json({ message: "Not Found Company for the Branch" });

  console.log(Number(Data?.IdArea));
  if (Number(Data?.IdArea) > 0) {
    var AreaData: any = await Area.findByPk(Number(Data?.IdArea));
    console.log(AreaData)
    const Create = await Users.create({
      ...Data,
      IdSucursal: Exist?.id,
    });
    await AreaData?.addUsuario(Create);
    return Res.json({
      create: true,
      message: "Usuario creado exitosamente y asignado a una area",
      body: Create,
    });
  }
  const Create = await Users.create({
    ...Data,
    IdSucursal: Exist?.id,
  });
  return Res.json({
    create: true,
    message: "Usuario creado exitosamente",
    body: Create,
  });
 } catch (error) {
  console.log(error)
  Res.json({error:true,message:'Error'})
 }
}
