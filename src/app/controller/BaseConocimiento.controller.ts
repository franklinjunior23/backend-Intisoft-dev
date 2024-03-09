import { ActualyDats } from "../utils/DateFecha";
import SuportDocs from "../models/SuportDocs";
import { Request, Response } from "express";
import CreateNotify from "../utils/CreateNotify";

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

    if (UserCreate == null || "")
      return res.json({
        create: false,
        message: "Solamente los Soportes pueden acceder a ello",
      });

    const data: any = await SuportDocs.create({
      ...Dats,
      Autor: UserCreate,
      Archivos: [...files],
    });

    if (!data) {
      return res.json({ create: false, message: "No se creo correctamente" });
    }
    await CreateNotify(
      `¡Nuevo documento en la base de conocimiento! Título: "${data?.Titulo}"`,
      UserCreate,
      req.User?.id
    );

    return res.status(200).json({
      message: "Se creo correctamente",
      create: true,
    });
  } catch (error) {
    console.log({ msg: error, name: "CreateBaseConocimiento", line: 85 });
    return res.json({ create: false, message: "Error en el servidor" });
  }
};
export const UpdateById = async (req: any, res: Response) => {
  const IDDOCSBS = req.params.id;
  const Data = req.body;
  const files = req.files;

  try {
    if (!Data || !Data.Contenido) {
      return res.json({ update: false, message: "Falta datos" });
    }

    const existingDoc: any = await SuportDocs.findByPk(IDDOCSBS);

    if (existingDoc.Contenido === Data.Contenido) {
      return res.json({
        update: false,
        message: "Tienes que cambiar para poder actualizar el documento",
      });
    }

    let updateData: any = { Contenido: Data.Contenido };

    if (files) {
      updateData.Archivos = [
        ...(existingDoc?.Archivos || []),
        ...(files || []),
      ];
    }

    const updatedDoc: any = await SuportDocs.update(updateData, {
      where: { id: IDDOCSBS },
    });

    if (!updatedDoc) {
      throw new Error("Error al actualizar el documento");
    }

    await CreateNotify(
      `Se ha actualizado el documento "${existingDoc?.Titulo}" de la base de conocimiento`,
      req.User?.nombre,
      req.User?.id
    );

    return res.json({ update: true, message: "Se actualizó correctamente" });
  } catch (error) {
    console.error(`Error al Actualizar Base de Conocimiento: ${error}`);
    res.status(500).json({
      update: false,
      error: true,
      message: "Hubo un error, intente nuevamente",
    });
  }
};

export const GetBaseConocById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id === null || id === undefined)
    return res.json({ error: true, message: "Falta datos" });
  try {
    const data = await SuportDocs.findByPk(id);
    if (data === null || data === undefined)
      return res.json({ search: false, message: "No se encontro el registro" });
    return res.json({ search: true, data });
  } catch (error) {
    return res.json({ error: true, message: "Error en el servidor" });
  }
};
