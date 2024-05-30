import SuportDocs from "../models/SuportDocs";
import { Request, Response } from "express";
import CreateNotify from "../utils/CreateNotify";
import Knowledge from "../models/SuportDocs";
import FolderKnowledge from "../models/FolderKnowledge";
import { Op } from "sequelize";
import Cloudinary from "../services/Cloudinary";

export const GetBaseConocimientos = async (req: Request, res: Response) => {
  try {
    const elements_knowledge = [
      "id",
      "Titulo",
      "Categoria",
      "createdAt",
      "updatedAt",
      "Autor",
    ];
    const data = await FolderKnowledge.findAll({
      where: { parentId: { [Op.eq]: null } },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          include: [
            {
              model: Knowledge,
              attributes: elements_knowledge,
              as: "knowledges",
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  attributes: elements_knowledge,
                },
              ],
            },
          ],
        },
        { model: Knowledge, as: "knowledges", attributes: elements_knowledge },
      ],
    });

    return res.json({ details: { cantidad: data?.length }, data });
  } catch (error: any) {
    return res.status(401).json({ error, mesage: error?.message });
  }
};

export const GetDeleteKnowledge = async (req: Request, res: Response) => {
  try {
    const data = await FolderKnowledge.findAll({
      where: { delete: { [Op.ne]: null } },
      paranoid: false,
      order: [["delete", "DESC"]],
      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          paranoid: false,
          include: [
            {
              model: Knowledge,
              as: "knowledges",
              paranoid: false,
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              paranoid: false,
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  paranoid: false,
                },
              ],
            },
          ],
        },
        {
          model: Knowledge,
          as: "knowledges",
          paranoid: false,
        },
      ],
    });
    const { count } = await FolderKnowledge.findAndCountAll({
      where: { delete: { [Op.ne]: null } },
      paranoid: false,

      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          paranoid: false,
          include: [
            {
              model: Knowledge,
              as: "knowledges",
              paranoid: false,
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              paranoid: false,
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  paranoid: false,
                },
              ],
            },
          ],
        },
        {
          model: Knowledge,
          as: "knowledges",
          paranoid: false,
        },
      ],
    });

    return res.json({ data, count });
  } catch (error: any) {
    return res.status(401).json({ error, mesage: error?.message });
  }
};

export const CreateBaseConocimiento = async (req: any, res: Response) => {
  try {
    const Dats = req.body;
    const UserCreate = req.User.nombre;
    const files = req?.files;

    if (UserCreate == null || "")
      return res.json({
        create: false,
        message: "Solamente los Soportes pueden acceder a ello",
      });

    const data: any = await SuportDocs.create({
      ...Dats,
      Autor: UserCreate,

      Archivos: files ? [...files] : null,
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
  } catch (error: any) {
    return res.json({ create: false, message: error?.message });
  }
};
export const UpdateById = async (req: any, res: Response) => {
  const IDDOCSBS = req.params.id;
  const Data: {
    Contenido: string;
    Titulo: string;
    Categoria: string;
    Archivos: any[];
  } = req.body;
  const files = req.files;

  try {
    if (!Data || !Data.Contenido) {
      return res.json({ update: false, message: "Falta datos" });
    }

    const existingDoc: Knowledge | null = await SuportDocs.findByPk(IDDOCSBS);

    if (files) {
      Data.Archivos = [...(existingDoc?.Archivos || []), ...(files || [])];
    }

    const updatedDoc: any = await SuportDocs.update(Data, {
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
  if (!id) return res.json({ error: true, message: "Falta datos" });
  try {
    const data = await SuportDocs.findByPk(id);
    if (!data)
      return res.json({
        succes: true,
        error: true,
        search: false,
        message: "No se encontro el registro",
      });
    return res.json({ search: true, data, succes: true, error: false });
  } catch (error) {
    return res.json({ error: true, message: "Error en el servidor" });
  }
};

export class KnowledgeController {
  async CreateArticleBYFolder(req: any, res: Response) {
    type Article = {
      Titulo: string;
      Contenido: string;
      Categoria: string;
      folderId: string;
    };
    const databody: Article = req.body;
    const { folderId } = req.params;
    const image = req.files["image"];

    if (!databody || !folderId)
      return res.json({ error: true, message: "Falta datos" });

    const succesuploadFiles: any = await Cloudinary.uploadImages(
      image
    );

    if (!succesuploadFiles) {
      return res.json({
        ok: false,
        error: true,
        message: `Error en la creacion del articulo  ${databody.Titulo}`,
      });
    }

    const DataFiles = succesuploadFiles?.map((file:any) => {
      return {
        url: file.secure_url,
        public_id: file.public_id,
        type: file.format,
      };
    });

    const folder: FolderKnowledge | null = await FolderKnowledge.findByPk(
      folderId
    );

    if (!folder)
      return res
        .status(404)
        .json({ ok: false, message: "No se encontro la carpeta" });

    const newArticle = await Knowledge.create({
      Autor: req?.user?.datos?.nombre,
      ...databody,
      Archivos: DataFiles,
      folderId: folder?.id,
    });

    return res.status(201).json({
      ok: true,
      data: newArticle,
      message: `Se creo correctamente el articulo "${newArticle.Titulo}" en la carpeta "${folder.name}"`,
    });
  }
  async CreateFolder(req: Request, res: Response) {
    const { name, parentId } = req.body;

    if (!name && !parentId)
      return res.json({ create: false, message: "Faltan datos" });

    try {
      const data: FolderKnowledge = await FolderKnowledge.create({
        name: String(name),
        parentId: parentId ?? null,
      });

      if (!data)
        return res.json({
          create: false,
          message: "No se creo correctamente",
        });

      return res
        .status(201)
        .json({ create: true, data, message: "Se creo correctamente" });
    } catch (error: any) {
      console.log("error createfolder");
      res.json({ create: false, message: error?.message });
    }
  }
  async DeleteFolder(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.json({ succes: false, message: "No se encontro" });

    try {
      const data: FolderKnowledge | null = await FolderKnowledge.findByPk(id);

      if (!data) return res.json({ succes: false, message: "No se encontro" });

      const datadelete = await data.destroy();

      return res.json({
        succes: true,
        message: "Se elimino correctamente",
        data: datadelete,
      });
    } catch (error: any) {
      return res.json({ succes: false, message: error?.message });
    }
  }

  async RestaureFolder(req: Request, res: Response) {
    const { id } = req.params;

    const fetch: FolderKnowledge | null = await FolderKnowledge.findByPk(id, {
      paranoid: false,
    });

    if (!fetch) return res.json({ succes: false, message: "Not Found" });

    await fetch?.restore();

    return res.json({
      succes: true,
      message: `Se restauro correctamente la carpeta ${fetch.name}`,
    });
  }
  async UpdateFolder(req: Request, res: Response) {}
}
