import { ActualyDats } from "../utils/DateFecha";
import SuportDocs from "../models/SuportDocs";
import { Request, Response } from "express";

export const GetBaseConocimientos = async (req: Request, res: Response) => {
  try {
    const data: any = await SuportDocs.findAll({
      order: [["createdAt", "DESC"]],
    });
    const Details = {
      cantidad: data.length,
      create: ActualyDats(data),
    };

    return res.json({ details: Details, data });
  } catch (error) {
    return res.status(401).json({ error, mesage: "Error en el servidor" });
  }
};

export const CreateBaseConocimiento = async (req: any, res: Response) => {
  try {

    const Dats = req.body;
    const UserCreate = req.User.nombre;
    const files = req.files;
    console.log(Dats)

    if (UserCreate == null || "")
      return res.json({
        create: false,
        message: "Solamente los Soportes pueden acceder a ello",
      });

    const data = await SuportDocs.create({
      ...Dats,
      Autor: UserCreate,
      Archivos: [...files],
    });

    if (!data) {
      return res.json({ create: false, message: "No se creo correctamente" });
    }
    return res.status(200).json({
      message: "Se creo correctamente",
      create: true,
    });
  } catch (error) {
    console.log({ msg: error, name: "CreateBaseConocimiento", line: 85 })
    return res.json({ create: false, message: "Error en el servidor" });
  }
};
export const UpdateById = async (req: any, res: Response) => {
  const IDDOCSBS = req.params.id;
  const Data = req.body;
  try {
    if (Data?.Contenido == null || "")
      return res.json({ update: false, message: "Falta datos" });
    const DocOld: any = await SuportDocs.update(
      { Contenido: Data?.Contenido },
      {
        where: { id: IDDOCSBS },
      }
    );
    console.log(DocOld);
    if (DocOld)
      return res.json({ update: true, message: `Se actualizo correctamente ` });
    return res.json({
      update: false,
      message: "No se actualizo correctamente",
    });
  } catch (error) {
    res.json({
      update: false,
      error: true,
      message: "Hubo un error , intente nuevamente",
    });
  }
};

export const GetBaseConocById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id === null || id === undefined)
    return res.json({ error: true, message: "Falta datos" });
  try {
    const data = await SuportDocs.findByPk(id);
    if(data ===null || data === undefined) return res.json({ search:false ,message:"No se encontro el registro"})
    return res.json({ search:true ,data });
  } catch (error) {
    return res.json({ error: true, message: "Error en el servidor" });
  }
};
